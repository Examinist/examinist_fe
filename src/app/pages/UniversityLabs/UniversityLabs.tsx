import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Menu,
  MenuItem,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F5F5",
    borderBottom: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: "none",
  },
}));

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const [LabName, setLabName] = useState("");
  const [LabCapacity, setLabCapacity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCloseAdd = () => {
    setLabName("");
    setLabCapacity(null);
    openAddLab(false);
  };

  const validateChange = () => {
    let error = false;
    if (LabName === "") {
      setErrorMsg("Empty Input!");
      error = true;
    } else if (LabCapacity == null) {
      setErrorMsg("Empty Input!");
      error = true;
    } else {
      labs.forEach((lab) => {
        if (lab.name == LabName) {
          setErrorMsg("Topic Name Already Exists!");
          error = true;
        }
      });
    }
    setErrorMsg(null);
    if (!error) {
      var newLab: ILab = {
        name: LabName,
        capacity: Number(LabCapacity),
      };
      addLabApi(newLab)
        .then(() => {
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
    }
  };

  const handleEdit = () => {};

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    lab: ILab
  ) => {
    console.log("in delete", lab);
    // if (lab.id) {
    //   deleteLabApi(lab.id)
    //     .then(() => {
    //       loadLabs();
    //     })
    //     .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
    //       setAlertState({
    //         open: true,
    //         message: data?.message! || statusText,
    //         severity: "error",
    //       });
    //     })
    //     .finally(()=>{
    //       setAnchorEl(null);
    //       event.stopPropagation();
    //     });
    // }
  };
  return (
    <>
      {isloading ? (
        <CustomCircularProgress />
      ) : (
        <Box sx={{ px: 15, py: 5 }}>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "medium",
              fontFamily: "montserrat",
              paddingBottom: "10px",
            }}
          >
            University Labs
          </Box>
          <Card
            sx={{
              paddingX: "25px",
              paddingY: "35px",
              bgcolor: "White",
              borderRadius: "10px",
            }}
          >
            <TableContainer sx={{ borderRadius: "10px" }}>
              <Table>
                <TableHead sx={{ color: "#F5F5F5" }}>
                  <TableRow>
                    {tableHeader.map((value, index) => (
                      <StyledTableCell sx={{ fontSize: 16 }} align="center">
                        {value}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labs.map((lab, index) => (
                    <TableRow key={lab.id!}>
                      <StyledTableCell align="center">
                        {lab.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {lab.capacity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              sx={{ minWidth: "150px" }}
                              onClick={handleEdit}
                            >
                              Edit
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              sx={{ minWidth: "150px" }}
                              onClick={(event: any) => {
                                console.log(index, lab)
                                handleDelete(event, lab);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                  {addLab ? (
                    <TableRow>
                      <StyledTableCell align="center">
                        <TextField
                          onChange={(event) => setLabName(event.target.value)}
                          value={LabName}
                          placeholder="Enter new lab name"
                          error={errorMsg ? true : false}
                          helperText={errorMsg}
                          InputProps={{ sx: { height: "32px" } }}
                          sx={{
                            bgcolor: "#F5F5F5",
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
                          onChange={(event) =>
                            setLabCapacity(event.target.value)
                          }
                          value={LabCapacity}
                          placeholder="Enter lab capacity"
                          error={errorMsg ? true : false}
                          helperText={errorMsg}
                          InputProps={{ sx: { height: "32px" } }}
                          sx={{
                            bgcolor: "#F5F5F5",
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
                        <IconButton onClick={validateChange}>
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
        </Box>
      )}
    </>
  );
}
