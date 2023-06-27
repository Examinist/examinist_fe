import { Divider, IconButton, Menu, MenuItem, TableRow } from "@mui/material";
import { ILab } from "../../types/Lab";
import LabCell from "./LabCell";
import { useState } from "react";
import { StyledTableCell } from "./UniversityLabs";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteLabApi, updateLabApi } from "../../services/APIs/LabsAPIs";
import { IErrorResponse } from "../../services/Response";
import useAlert from "../../hooks/useAlert";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ILabTableRowProps {
  lab: ILab;
  index: number;
  onChange: () => void;
}

export interface IFormInput {
  name: string;
  capacity: number;
}

const schema = yup.object({
  name: yup.string().required("name is required"),
  capacity: yup.number().required("Capacity is required."),
});

export default function LabTableRow({
  lab,
  index,
  onChange,
}: ILabTableRowProps) {
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setAlertState } = useAlert();
  //const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: lab.name,
      capacity: lab.capacity,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (inputs: IFormInput) => {
    console.log(inputs);
    const updatedLab:ILab = {...inputs, id: lab.id};
     updateLabApi(updatedLab)
       .then(() => {
         onChange();
         setEdit(false);
          setAlertState({
            open: true,
            message: "Lab is updated successfully.",
            severity: "success",
          });
       })
       .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
         setAlertState({
           open: true,
           message: data?.message! || statusText,
           severity: "error",
         });
       });
  };

  const handleDelete = () => {
    deleteLabApi(lab.id!)
      .then(() => {
        onChange();
        setAlertState({
          open: true,
          message:"Lab is deleted successfully.",
          severity: "success",
        });
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message! || statusText,
          severity: "error",
        });
      });
  };

  return (
    <TableRow key={lab.id!}>
      <>
        <FormProvider {...methods}>
          <LabCell edit={edit} lab={lab} />
          <StyledTableCell align="right">
            <form onSubmit={handleSubmit(onSubmit)}>
              {!edit ? (
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={Boolean(anchorEl) ? "long-menu" : undefined}
                    aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    elevation={0}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow:
                          "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                      },
                    }}
                  >
                    <MenuItem
                      sx={{ minWidth: "150px" }}
                      onClick={(event: any) => {
                        setEdit(true);
                        handleClose(event);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      sx={{ minWidth: "150px" }}
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div>
                  <IconButton onClick={(event) => setEdit(false)}>
                    <ClearIcon
                      sx={{
                        color: "#f44336",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    type="submit"
                    //   onClick={() => {
                    //     //handleEdit
                    //     setEdit(false);
                    //   }}
                  >
                    <CheckOutlinedIcon color="primary" />
                  </IconButton>
                </div>
              )}
            </form>
          </StyledTableCell>
        </FormProvider>
      </>
    </TableRow>
  );
}
