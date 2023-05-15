import { TableCell, TableRow } from "@mui/material";
import ExamActions from "./ExamActions";
import { ExamStatusEnum } from "../../types/Exam";

function getStatusColor(status: ExamStatusEnum) {
    switch (status) {
        case ExamStatusEnum.GRADED: return "#3FC164"
        case ExamStatusEnum.ONGOING: return "#1B84BF"
        case ExamStatusEnum.PENDINGGRADING: return "#E96E15"
        case ExamStatusEnum.SCHEDULED: return "#FFAC4B"
        case ExamStatusEnum.UNSCHEDULED: return "#FF4B4B"
    }
}

export function ExamStatusString(status: ExamStatusEnum){
    switch (status) {
        case ExamStatusEnum.GRADED: return "Graded"
        case ExamStatusEnum.ONGOING: return "On Going"
        case ExamStatusEnum.PENDINGGRADING: return "Pending Grading"
        case ExamStatusEnum.SCHEDULED: return "Scheduled"
        case ExamStatusEnum.UNSCHEDULED: return "Unscheduled"
    }
}

interface IExamRowProp {
    attributes: any[],
    status: ExamStatusEnum,
    actionButton: boolean,
    allExams: boolean,
}

export default function ExamTableRow({ attributes, status, actionButton, allExams }: IExamRowProp) {
    return (
        <TableRow>
            {attributes.map((value) => {
                if (Object.values(ExamStatusEnum).includes(value)) {
                    return (<TableCell sx={{ color: getStatusColor(value) }}>{ExamStatusString(value)}</TableCell>)
                }
                return (<TableCell>{value}</TableCell>)
            })}
            {actionButton && 
            <TableCell>
                <ExamActions status={status}
                allExams={allExams}></ExamActions>
            </TableCell>
            }
        </TableRow>
    );
}