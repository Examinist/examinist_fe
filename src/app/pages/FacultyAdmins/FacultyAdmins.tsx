import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import IUser, { UserRoleEnum } from '../../types/User';
import { mockInstructor } from '../../services/APIs/mockData/MockData';
import { Delete } from '@mui/icons-material';
import theme from '../../../assets/theme';
import AdminAccordion from './components/adminAccordion';

export default function FacultyAdmins() {
  const admins: IUser[] = [{ ...mockInstructor, role: UserRoleEnum.FACULTY_ADMIN }, { ...mockInstructor, id: 2, role: UserRoleEnum.FACULTY_ADMIN }];
  const faculties: string[] = ["Engineering", "Science"];
  const instructors: IUser[] = [{ ...mockInstructor, id:3 }, { ...mockInstructor, id: 4 }];

  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          paddingBottom: "10px"
        }}
      >
        Faculties Admins
      </Box>
      {faculties.map((value) =>
        <AdminAccordion
          faculty={value}
          admins={admins}
          instructors={instructors}
          ></AdminAccordion>
      )}

    </Box>
  )
}
