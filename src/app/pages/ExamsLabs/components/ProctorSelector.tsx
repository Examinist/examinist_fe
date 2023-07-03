import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import theme from "../../../../assets/theme";
import React, { useEffect } from "react";
import { IBusyLab } from "../../../types/Lab";
import { useParams } from "react-router-dom";
import {
  IBusyLabResponse,
  IProctorsListResponse,
  assignProctorToLabApi,
  getAvailableProctors,
} from "../../../services/APIs/ControlAPIs";
import { IStaff } from "../../../types/User";
import useAlert from "../../../hooks/useAlert";
import { IErrorResponse } from "../../../services/Response";

export default function ProctorSelector({ initialLab }: { initialLab: IBusyLab }) {
  const [lab, setLab] = React.useState<IBusyLab>(initialLab);
  const [proctors, setProctors] = React.useState<IStaff[] | undefined>();
  const { examId } = useParams<{ examId: string }>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [proctorId, setProctorId] = React.useState<string>(
    lab.proctor?.id.toString() || ""
  );
  const { setAlertState } = useAlert();

  useEffect(() => {
    getAvailableProctors(parseInt(examId!), lab.id)
      .then(({ data }: IProctorsListResponse) => {
        if (lab.proctor) {
          setProctors([...data.proctors, lab.proctor]);
        } else {
          setProctors(data.proctors);
        }
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong!",
        });
      });
  }, []);

  const handleChange = (event: any) => {
    setProctorId(event.target.value);
  };

  const handleAssignProctor = () => {
    setLoading(true);
    assignProctorToLabApi(parseInt(examId!), lab.id, parseInt(proctorId))
      .then(({data}: IBusyLabResponse) => {
        setLab(data.busy_lab);
        setAlertState({
          open: true,
          severity: "success",
          message: "Proctor assigned successfully!",
        });
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        gap: 2,
      }}
    >
      <FormControl style={{ width: "70%" }} size="small">
        <InputLabel>Select Proctor</InputLabel>
        <Select
          label="Select Proctor"
          value={proctorId}
          onChange={handleChange}
        >
          {proctors &&
            proctors.map((proctor) => (
              <MenuItem value={proctor.id} key={proctor.id}>
                {proctor.first_name + " " + proctor.last_name}
              </MenuItem>
            ))}
          {proctors && proctors.length === 0 && (
            <MenuItem value={""} disabled>
              No proctors available
            </MenuItem>
          )}
        </Select>
      </FormControl>
      {lab?.proctor?.id === parseInt(proctorId) || proctorId === "" ? (
        <></>
      ) : (
        <Button
          variant="contained"
          sx={{
            borderRadius: "15px",
            textTransform: "none",
            px: 3,
          }}
          onClick={handleAssignProctor}
          disabled={loading}
        >
          Save
        </Button>
      )}
    </Box>
  );
}
