import IconButton from "@mui/material/IconButton";
import { ExamStatusEnum } from "../../types/Exam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";

function getStatusActions(status: ExamStatusEnum) {
    switch (status) {
        case ExamStatusEnum.GRADED: return ["View", "Regrade"]
        case ExamStatusEnum.ONGOING: return ["View"]
        case ExamStatusEnum.PENDINGGRADING: return ["View", "Grade"]
        case ExamStatusEnum.SCHEDULED: return ["View", "Edit"]
        case ExamStatusEnum.UNSCHEDULED: return ["View", "Edit", "Delete"]
    }
}

export interface IExamStatusProps{
    status?: ExamStatusEnum,
    allExams: boolean,
}

export default function ExamActions({status, allExams}: IExamStatusProps) {
    var actions: string[] = [];
    if(allExams){
        actions = ["View Course Exams"]
    }else if(status!=undefined){
        actions = getStatusActions(status)
    }
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

    return (
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
                {actions.map((value, index) => (
                    <div>
                        <MenuItem
                            sx={{ minWidth: "150px" }}
                            onClick={(event: any) => handleClose(event)}
                        >{value}
                        </MenuItem>
                        {index!==(actions.length-1) ? <Divider /> : <></>}
                    </div>
                ))}
            </Menu>
        </div>
    );
}