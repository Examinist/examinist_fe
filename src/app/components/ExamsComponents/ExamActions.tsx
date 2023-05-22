import IconButton from "@mui/material/IconButton";
import { ExamStatusEnum, IExam } from "../../types/Exam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
    exam:IExam,
    status?: ExamStatusEnum,
    allExams: boolean,
}

export default function ExamActions({exam,status, allExams}: IExamStatusProps) {
    const navigate = useNavigate();

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
    const handleAction = (event: React.MouseEvent<HTMLButtonElement>,action:String) => {
        if(action=="View"){
            console.log("View");
            const examId = exam.id;
            navigate("./view", { state: { examId } });

        
        }
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
                    <div key={value}>
                        <MenuItem
                            sx={{ minWidth: "150px" }}
                            onClick={(event: any) => handleAction(event,value)}
                        >{value}
                        </MenuItem>
                        {index!==(actions.length-1) ? <Divider /> : <></>}
                    </div>
                ))}
            </Menu>
        </div>
    );
}