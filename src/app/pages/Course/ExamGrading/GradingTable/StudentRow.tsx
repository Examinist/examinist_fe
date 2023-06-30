import {
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ExamActions from "../../../../components/ExamsComponents/ExamActions";
import { ExamStatusEnum, IExam } from "../../../../types/Exam";
import { IStudentExam, StudentStatusEnum } from "../../../../types/StudentExam";
import theme from "../../../../../assets/theme";
import Grade from "@mui/icons-material/DriveFileRenameOutlineOutlined";
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

export default function StudentRow({ student }: { student: IStudentExam }) {
  const getColor = () => {
    switch (student.student_status) {
      case StudentStatusEnum.ATTENDED:
        return "success";
      case StudentStatusEnum.ABSENT:
        return "error";
    }
  };
  const ExamStatusString = () => {
    switch (student.status) {
      case ExamStatusEnum.GRADED:
        return "success";
      case ExamStatusEnum.PENDINGGRADING:
        return "warning";
    }
  };
  return (
    <TableRow>
      <TableCell key={student.id}>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "regular",
            fontSize: "16px",
          }}
        >
          {student.student.first_name +
            " " +
            student.student.last_name +
            "  (" +
            student.student.academic_id +
            ")"}
        </Typography>
      </TableCell>
      <TableCell key={student.id}>
        <Chip
          label={student.student_status}
          variant="outlined"
          color={getColor()}
        />
      </TableCell>
      <TableCell key={student.id}>
        {student.student_status == StudentStatusEnum.ATTENDED ? (
          <Chip
            label={student.status}
            variant="outlined"
            color={ExamStatusString()}
          />
        ) : (
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontWeight: "regular",
              fontSize: "16px",
            }}
          >
            ---
          </Typography>
        )}
      </TableCell>
      <TableCell key={student.id}>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "regular",
            fontSize: "16px",
          }}
        >
          {student.partial_graded_questions +
            "/" +
            student.total_graded_questions}
        </Typography>
      </TableCell>
      <TableCell key={student.id}>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "regular",
            fontSize: "16px",
          }}
        >
          {student.partial_score + "/" + student.total_score}
        </Typography>
      </TableCell>
      <TableCell key={student.id}>
        <IconButton aria-label="grade" size="large" color="primary">
          <Grade fontSize="inherit" />
        </IconButton>
      </TableCell>

    
    </TableRow>
  );
}
