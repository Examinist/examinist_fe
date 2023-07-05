import {
  Box,
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ILab } from "../../types/Lab";
import { mockLabs } from "../../services/APIs/mockData/MockData";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import theme from "../../../assets/theme";
import { LensBlurSharp } from "@mui/icons-material";
import {
  ILabResponse,
  ILabsListResponse,
  addLabApi,
  deleteLabApi,
  getLabsListApi,
} from "../../services/APIs/LabsAPIs";
import useAlert from "../../hooks/useAlert";
import { IErrorResponse } from "../../services/Response";
import CustomCircularProgress from "../../components/CustomCircularProgress";
import LabTableRow from "./LabTableRow";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F5F5",
    borderBottom: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: "none",
  },
}));

interface IFormInput {
  name: string;
  capacity: number;
}

const schema = yup.object().shape({
  name: yup.string().trim().required("Lab name is required"),
  capacity: yup
    .number()
    .required("Lab capacity is required")
    .typeError("Lab capacity must be a number"),
});

export default function UniversityLabs() {
  const tableHeader = ["Lab Name", "Capacity", ""];
  const [labs, setLabs] = useState<ILab[]>([]);
  const { setAlertState } = useAlert();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const loadLabs = () => {
    setIsLoading(true);
    getLabsListApi()
      .then(({ data }: ILabsListResponse) => {
        console.log(data);
        setLabs(data.labs);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message! || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadLabs();
  }, []);

  const [addLab, openAddLab] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const handleCloseAdd = () => {
    reset();
    openAddLab(false);
  };

  const onSubmit = (input: IFormInput) => {
    var newLab: ILab = {
      name: input.name,
      capacity: input.capacity,
    };
    addLabApi(newLab)
      .then(() => {
        setAlertState({
          open: true,
          message: "Lab is added successfully.",
          severity: "success",
        })
        loadLabs();
        handleCloseAdd();
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
    <>
      
      
        <Box sx={{ px: 15, py: 5 }}>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "medium",
              fontFamily: "montserrat",
              paddingBottom: "30px",
            }}
          >
            University Labs
          </Box>
          {isloading ? (
            <CustomCircularProgress />
          ) : (
          <Card
            sx={{
              paddingX: "25px",
              paddingY: "35px",
              bgcolor: "White",
              borderRadius: "10px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} id="add-lab-form"></form>
            <TableContainer sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead sx={{ color: "#F5F5F5" }}>
                  <TableRow>
                    {tableHeader.map((value, index) => (
                      <StyledTableCell sx={{ fontSize: 16 }} align="center" key={value}>
                        {value}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labs.map((lab, index) => (
                    <LabTableRow
                      key={lab.id}
                      onChange={loadLabs}
                      lab={lab}
                      index={index}
                    ></LabTableRow>
                  ))}
                  {addLab ? (
                    <TableRow>
                      <StyledTableCell align="center">
                        <TextField
                          {...register("name")}
                          placeholder="Enter new lab name"
                          variant="outlined"
                          label="Lab Name"
                          error={errors.name ? true : false}
                          helperText={errors.name?.message}
                          size="small"
                          sx={{
                            borderColor: "#D9D9D9",
                            "& .MuiFormLabel-root": {
                              fontSize: "14px",
                              fontWeight: "medium",
                            },
                          }}
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          {...register("capacity")}
                          variant="outlined"
                          label="Capacity"
                          placeholder="Enter lab capacity"
                          error={errors.capacity ? true : false}
                          helperText={errors.capacity?.message}
                          sx={{
                            borderColor: "#D9D9D9",
                            "& .MuiFormLabel-root": {
                              fontSize: "14px",
                              fontWeight: "medium",
                            },
                          }}
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton onClick={handleCloseAdd}>
                          <ClearIcon
                            sx={{
                              color: "#f44336",
                            }}
                          />
                        </IconButton>
                        <IconButton type="submit" form="add-lab-form">
                          <CheckOutlinedIcon color="primary" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end">
              {!addLab ? (
                <Button
                  variant="outlined"
                  onClick={() => openAddLab(true)}
                  sx={{
                    color: "#1B84BF",
                    backgroundColor: theme.palette.white.main,
                    width: "15%",
                    marginTop: "7px",
                    border: 1,
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "15px",
                    py: 1.5,
                    height: "40px",
                  }}
                >
                  Add Lab
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Card>
          )}
        </Box>
      
    </>
  );
}
