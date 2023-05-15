import { Box } from '@mui/material'
import ExamCard from '../../components/ExamsComponents/ExamCard'
import { IExam } from '../../types/Exam'
import { mockExamsList } from '../../services/APIs/mockData/MockData'

function getAllExamsAttributesList(exam: IExam){
  var attrList: string[] = []
  attrList = [exam.id.toString(),exam.title,exam.status,exam.course.code,exam.creator.first_name+" "+exam.creator.last_name,
  exam.created_at.toLocaleString(),exam.scheduled_date.toLocaleString()]
  return attrList;
}

export default function AllExams() {
  const tabs = ["All", "Unscheduled", "Scheduled", "On Going", "Pending Grading", "Graded"]
  const tableHeader = ["ID", "Title", "Status", "Course", "Creator", "Creation Date", "Scheduled Date", "Actions"]
  const rows: IExam[] = mockExamsList;

  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Exams
      </Box>
      <ExamCard
      tabs={tabs}
      tableHeader={tableHeader}
      rows={rows}
      attributesFunction={getAllExamsAttributesList}
      actionButton={true}
      allExams={true}
      ></ExamCard>
    </Box>
  )
}
