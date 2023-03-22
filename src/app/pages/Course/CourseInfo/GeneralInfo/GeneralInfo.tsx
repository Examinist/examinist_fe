import { Box } from '@mui/material';
import React from 'react'
import SimpleInfo from '../SimpleInfo';
import UsersAccordion, { User } from '../UsersAccordion';


const instructors: User[] = [{name: "Yousry Taha", username: "yousrytaha"}, {name: "Marwan Torki", username: "marwantorki"}];
const students: User[] = [
  { name: "Yasmine Hassan", username: "yasminehassan" },
  { name: "Menna Samir", username: "mennasamir" },
  { name: "Noha Ahmed", username: "nohaahmed" },
];
export default function GeneralInfo() {
  return (
    <div>
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
          content="Designing Data Intensive Applications"
        />
        <SimpleInfo title="Course Code" content="CSE 303" />

        <SimpleInfo title="End Date" content="11/5/2023" />

        <UsersAccordion title="Instructors" users={instructors} />

        <UsersAccordion title="Students" users={students} />
      </Box>
    </div>
  );
}
