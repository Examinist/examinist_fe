import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCourseGeneralInfoAPI, ICourseInfoResponse } from '../../../../services/APIs/CoursesAPIs';
import { ICourseInfo } from '../../../../types/Course';
import SimpleInfo from '../SimpleInfo';
import UsersAccordion from '../UsersAccordion';


export default function GeneralInfo() {
  const {courseId}  = useParams<{courseId: string}>();
  const [courseInfo, setCourseInfo] = useState<ICourseInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCourseGeneralInfoAPI(courseId!)
    .then(({data}: ICourseInfoResponse) => {
       setCourseInfo(data.course_info);
       setIsLoading(false);
    });
  
  }, [])
  
  return (
    <Box sx={{px: 15, py: 5}}>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    {courseInfo && !isLoading && (
        <>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "medium",
              fontFamily: "montserrat",
            }}
          >
            Course General Info
          </Box>
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            <SimpleInfo
              title="Course Title"
              content={courseInfo.title}
            />
            <SimpleInfo title="Course Code" content={courseInfo.code} />

            <SimpleInfo title="Credit Hours" content={courseInfo.credit_hours} />

            <UsersAccordion title="Instructors" users={courseInfo.instructors} />

            <UsersAccordion title="Students" users={courseInfo.students} />
          </Box>
        </>
      )}
    </Box>
  );
}

