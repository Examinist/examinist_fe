import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { getCourseGroupsAPI, ICourseGroupsResponse } from "../../../../services/APIs/CoursesAPIs";
import { ICourseGroup } from "../../../../types/Course";
import CourseGroup from "../CourseGroup";


export default function CourseGroups() {
  const [groups, setGroups] = React.useState<ICourseGroup[]>([]);
  const { courseId } = useParams<{courseId: string}>();
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    getCourseGroupsAPI(courseId!)
    .then(({data}: ICourseGroupsResponse) => {
      console.log(data);
      setGroups(data.course_groups);
      setLoading(false);
    });
  }, []);
  
  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Course Groups
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        {groups.map((group) => (
          <div key={group.name}>
            <CourseGroup {...group} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
