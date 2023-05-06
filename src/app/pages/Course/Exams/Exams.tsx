import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IExamResponse, IExamsListResponse, getExamApi, getExamsApi } from '../../../services/APIs/ExamAPIs';
import { ExamStatusEnum } from '../../../types/Exam';

export default function Exams() {
  const {courseId} = useParams<{courseId: string}>();
  useEffect(() => {
    getExamsApi(parseInt(courseId!), ExamStatusEnum.UNSCHEDULED)
    .then(({data}: IExamsListResponse) =>{
      console.log(data);
    });
  }, []);
  return (
    <div>Exams</div>
  )
}
