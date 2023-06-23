import { Box, Button, Card, Divider, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { ILab } from '../../types/Lab';
import { mockLabs } from '../../services/APIs/mockData/MockData';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../../assets/theme';
import { LensBlurSharp } from '@mui/icons-material';

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
  const [labs, setLabs] = useState(mockLabs);

  useEffect(() => {
    // getLabsListApi().then((res) => {
    //   console.log(res);
    // });

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
  }

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
    if (!error) {
      var newLab: ILab = {
        id: labs.at(labs.length - 1)?.id,
        name: LabName,
        capacity: Number(LabCapacity),
      }
      setLabs([...labs, newLab]);
      setErrorMsg(null);
      handleCloseAdd();
    }
  };

  const handleEdit = () => { }

  const handleDelete = () => { }
  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          paddingBottom: "10px"
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
        }}>
        <TableContainer sx={{ borderRadius: "10px" }}>
          <Table>
            <TableHead sx={{ color: "#F5F5F5" }}>
              <TableRow>
                {tableHeader.map((value, index) => (
                  <StyledTableCell
                    sx={{ fontSize: 16 }}
                    align="center"
                  >{value}</StyledTableCell>
                ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {labs.map((value) =>
                <TableRow>
                  <StyledTableCell align="center">{value.name}</StyledTableCell>
                  <StyledTableCell align="center">{value.capacity}</StyledTableCell>
                  <StyledTableCell align='right'>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}>
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
                        >Edit
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          sx={{ minWidth: "150px" }}
                          onClick={handleDelete}
                        >Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  </StyledTableCell>
                </TableRow>
              )}
              {addLab ?
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
                      }}></TextField>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                    onChange={(event) => setLabCapacity(event.target.value)}
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
                      }}></TextField>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={handleCloseAdd}>
                      <ClearIcon
                        sx={{
                          color: "#f44336",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={validateChange}>
                      <CheckOutlinedIcon
                        color="primary" />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
                : <></>}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex"
          justifyContent="flex-end"
        >
          {!addLab ? <Button
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
              height: "40px"
            }}
          >
            Add Lab
          </Button> : <></>}
        </Box>
      </Card>
    </Box>
  )
}
