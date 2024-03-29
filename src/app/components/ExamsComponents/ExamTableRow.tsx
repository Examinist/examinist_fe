import { TableCell, TableRow } from "@mui/material";
import ExamActions from "./ExamActions";
import { ExamStatusEnum, IExam } from "../../types/Exam";

function getStatusColor(status: ExamStatusEnum) {
  switch (status) {
    case ExamStatusEnum.GRADED:
      return "#3FC164";
    case ExamStatusEnum.ONGOING:
      return "#1B84BF";
    case ExamStatusEnum.PENDINGGRADING:
      return "#E96E15";
    case ExamStatusEnum.SCHEDULED:
      return "#FFAC4B";
    case ExamStatusEnum.UNSCHEDULED:
      return "#FF4B4B";
  }
}

export function ExamStatusString(status: ExamStatusEnum) {
  switch (status) {
    case ExamStatusEnum.GRADED:
      return "Graded";
    case ExamStatusEnum.ONGOING:
      return "On Going";
    case ExamStatusEnum.PENDINGGRADING:
      return "Pending Grading";
    case ExamStatusEnum.SCHEDULED:
      return "Scheduled";
    case ExamStatusEnum.UNSCHEDULED:
      return "Unscheduled";
  }
}

interface IExamRowProp {
  exam: IExam;
  attributes: any[];
  status: ExamStatusEnum;
  actionButton: boolean;
  allExams: boolean;
}

export default function ExamTableRow({
  exam,
  attributes,
  status,
  actionButton,
  allExams,
}: IExamRowProp) {
  return (
    <TableRow>
      {attributes.map((value) => {
        if (Object.values(ExamStatusEnum).includes(value)) {
          return (
            <TableCell
              key={value}
              sx={{
                color: getStatusColor(value),
                fontWeight: "medium",
                fontSize: "16px",
              }}
            >
              {ExamStatusString(value)}
            </TableCell>
          );
        }
        return (
          <TableCell
            key={value}
            sx={{ color: "#6B6767", fontWeight: "regular", fontSize: "16px"  }}
          >
            {value}
          </TableCell>
        );
      })}
      {actionButton && (
        <TableCell align="right">
          <ExamActions
            exam={exam}
            status={status}
            allExams={allExams}
          ></ExamActions>
        </TableCell>
      )}
    </TableRow>
  );
}
