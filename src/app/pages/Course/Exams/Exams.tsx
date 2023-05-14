import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IExamResponse, IExamsListResponse, getExamApi, getExamsApi } from '../../../services/APIs/ExamAPIs';
import { ExamStatusEnum, IExam } from '../../../types/Exam';
import { Box, Card, Divider, IconButton, Menu, MenuItem, MenuList, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { mockExam } from '../../../services/APIs/mockData/MockData';
import { mockExamsList } from '../../../services/APIs/mockData/MockData';
import { MoreVert } from '@mui/icons-material';
import ExamActions from './ExamActions';

function getStatusColor(status: ExamStatusEnum) {
  switch (status) {
    case ExamStatusEnum.GRADED: return "#3FC164"
    case ExamStatusEnum.ONGOING: return "#1B84BF"
    case ExamStatusEnum.PENDINGGRADING: return "#E96E15"
    case ExamStatusEnum.SCHEDULED: return "#FFAC4B"
    case ExamStatusEnum.UNSCHEDULED: return "#FF4B4B"
  }
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
  const [currTab, selectTab] = useState(0);
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
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currTab}>
            {tabs.map((value, index) => (
              <Tab
                label={value} />
            ))}
          </Tabs>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeader.map((value, index) => (
                  <TableCell>{value}</TableCell>
                ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((exam, index) => (
                <TableRow>
                  <TableCell>{exam.id}</TableCell>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell sx={{ color: getStatusColor(exam.status) }}>{exam.status}</TableCell>
                  <TableCell>{exam.creation_mode}</TableCell>
                  <TableCell>{exam.creator.first_name + " " + exam.creator.last_name}</TableCell>
                  <TableCell>{exam.created_at.toLocaleString()}</TableCell>
                  <TableCell>{exam.scheduled_date.toLocaleString()}</TableCell>
                  <TableCell>
                    <ExamActions status={exam.status}></ExamActions>
                    </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
