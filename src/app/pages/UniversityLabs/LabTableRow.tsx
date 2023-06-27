import { Divider, IconButton, Menu, MenuItem, TableRow } from "@mui/material"
import { ILab } from "../../types/Lab"
import LabCell from "./LabCell"
import { useState } from "react"
import { StyledTableCell } from "./UniversityLabs";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearIcon from "@mui/icons-material/Clear";

interface ILabTableRowProps{
    lab: ILab,
    index: number,
    //handleEdit: ()=>void,
    //handleDelete: ()=>void,
}

export default function LabTableRow({lab, index}:ILabTableRowProps) {
    const [edit, setEdit] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    //const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
      };
    
      const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(null);
        event.stopPropagation();
      };

    return (
        <TableRow key={lab.id!}>
            <LabCell edit={edit} lab={lab}></LabCell>
            <StyledTableCell align="right">
                {!edit ?
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
                                }
                            }}
                        >
                            <MenuItem
                                sx={{ minWidth: "150px" }}
                                onClick={(event:any)=>{setEdit(true)
                                handleClose(event)
                            }}
                            >
                                Edit
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                sx={{ minWidth: "150px" }}
                                onClick={() => {
                                    //handleDelete
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                    </div> :
                    <div>
                        <IconButton
                            onClick={(event) => setEdit(false)}>
                            <ClearIcon
                                sx={{
                                    color: "#f44336",
                                }}
                            /></IconButton>
                        <IconButton
                        onClick={()=>{//handleEdit
                            setEdit(false)}
                        }>
                            <CheckOutlinedIcon
                                color="primary" /></IconButton>
                    </div>
                }
            </StyledTableCell>
        </TableRow>
    )
}