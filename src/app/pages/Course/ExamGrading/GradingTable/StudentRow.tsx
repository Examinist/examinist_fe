import {
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ExamActions from "../../../../components/ExamsComponents/ExamActions";
import { ExamStatusEnum, IExam } from "../../../../types/Exam";
import {
  IStudentExam,
  StudentStatusEnum,
  studentStatusEnumToColorMap,
} from "../../../../types/StudentExam";

import theme from "../../../../../assets/theme";
import Grade from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useNavigate } from "react-router-dom";

export default function StudentRow({ student }: { student: IStudentExam }) {
  const navigate = useNavigate();

  const getColor = () => {
    switch (student.student_status) {
      case StudentStatusEnum.ATTENDED:
        return studentStatusEnumToColorMap[StudentStatusEnum.ATTENDED];
      case StudentStatusEnum.ABSENT:
        return studentStatusEnumToColorMap[StudentStatusEnum.ABSENT];
      case StudentStatusEnum.SICK_LEAVE:
        return studentStatusEnumToColorMap[StudentStatusEnum.SICK_LEAVE];
      case StudentStatusEnum.CHEATED:
        return studentStatusEnumToColorMap[StudentStatusEnum.CHEATED];
    }
  };
  const ExamStatusString = () => {
    switch (student.status) {
      case ExamStatusEnum.GRADED:
        return studentStatusEnumToColorMap[StudentStatusEnum.ATTENDED];
      case ExamStatusEnum.PENDINGGRADING:
        return studentStatusEnumToColorMap[StudentStatusEnum.CHEATED];
    }
  };
  return (
    <TableRow>
      <TableCell key="name">
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
      <TableCell key="student_status">
        {student.student_status !== null ? (
          <Chip
            label={student.student_status}
            variant="outlined"
            sx={{
              borderColor: getColor(),
              color: getColor(),
              fontWeight: "bold",
            }}
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
      <TableCell key="grading_status">
        {student.student_status == StudentStatusEnum.ATTENDED ? (
          <Chip
            label={student.status}
            variant="outlined"
            sx={{
              fontWeight: "bold",
              color: ExamStatusString(),
              borderColor: ExamStatusString(),
            }}
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
      <TableCell key="graded_questions">
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
      <TableCell key="score">
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
      <TableCell key="action">
        <IconButton
          aria-label="grade"
          size="large"
          color="primary"
          onClick={() => {
            navigate(`${student.id}`);
          }}
        >
          <Grade fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
