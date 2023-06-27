import { useEffect, useState } from "react";
import IUser, { IStaff, UserRoleEnum } from "../../../types/User";
import CustomDialog, {
  CustomDialogTitle,
} from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import {
  Box,
  DialogContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  IFacultyStaffListResponse,
  getFacultyInstructorsApi,
  updateStaffRoleApi,
} from "../../../services/APIs/FacultyAPIs";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";
import CustomCircularProgress from "../../../components/CustomCircularProgress";

interface IAdminDialogProp {
  facultyId: number;
  open: boolean;
  handleOpenClose: () => void;
  onSuccess: (facultyId:number)=> void
}

export default function AddAdminDialog({
  facultyId,
  open,
  handleOpenClose,
  onSuccess
}: IAdminDialogProp) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [instructors, setInstructors] = useState<IStaff[]>([]);
  const { setAlertState } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getFacultyInstructorsApi(facultyId)
      .then(({ data }: IFacultyStaffListResponse) => {
        setInstructors(data.staffs);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    console.log(instructors[index]);
    setLoading(true);
    updateStaffRoleApi(
      facultyId,
      instructors[index].id,
      UserRoleEnum.FACULTY_ADMIN
    )
      .then(() => {
        handleOpenClose();
        onSuccess(facultyId);
        setAlertState({
          open: true,
          message: "User is assigned succesfully.",
          severity: "success",
        });
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CustomDialog
      fullWidth
      maxWidth="md"
      onClose={handleOpenClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <CustomDialogTitle onClose={handleOpenClose}>
        <Box sx={{ mx: 2, my: 1 }}>Select Faculty Admin</Box>
      </CustomDialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3, mx: 2, my: 1 }}>
        <Box
          sx={{
            color: "#969090",
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Faculty instructors
        </Box>
        {loading ? (
          <CustomCircularProgress />
        ) : (
          <List>
            {instructors.map((value, index) => (
              <div key={value.id}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  <ListItemText
                    primary={value.first_name + " " + value.last_name}
                    primaryTypographyProps={{
                      fontWeight: "medium",
                      fontSize: 16,
                    }}
                    secondary={value.username}
                    secondaryTypographyProps={{
                      fontWeight: "medium",
                      fontSize: 14,
                      color: "#969090",
                    }}
                  ></ListItemText>
                </ListItemButton>
                {index < instructors.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
      </DialogContent>
    </CustomDialog>
  );
}
