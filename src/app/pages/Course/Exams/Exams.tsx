import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {IExamsListResponse, getExamsApi } from '../../../services/APIs/ExamAPIs';
import { ExamStatusEnum, IExam } from '../../../types/Exam';
import { Box } from '@mui/material';
import ExamCard from '../../../components/ExamsComponents/ExamCard';
import { mockExamsList } from '../../../services/APIs/mockData/MockData';

function getCourseExamAttributesList(exam: IExam){
  var attrList: string[] = []
  attrList = [exam.id.toString(),exam.title,exam.status,exam.creation_mode,exam.creator.first_name+" "+exam.creator.last_name,
  exam.created_at.toLocaleString(),exam.scheduled_date.toLocaleString()]
  return attrList;
}

export default function Exams() {
  const { courseId } = useParams<{ courseId: string }>();
  useEffect(() => {
    getExamsApi(parseInt(courseId!), ExamStatusEnum.UNSCHEDULED)
      .then(({ data }: IExamsListResponse) => {
        console.log(data);
      });
  }, []);

  const tabs = ["All", "Unscheduled", "Scheduled", "On Going", "Pending Grading", "Graded"]
  const tableHeader = ["ID", "Title", "Status", "Creation Mode", "Creator", "Creation Date", "Scheduled Date", "Actions"]
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
      attributesFunction={getCourseExamAttributesList}
      actionButton={true}
      allExams={false}
      ></ExamCard>
    </Box>
  )
}
