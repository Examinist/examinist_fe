import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import React, { useEffect } from 'react';
import { ILab } from '../../types/Lab';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F5F5",
    //color: theme.palette.common.white,
  },
}));  

export default function UniversityLabs() {
  const tableHeader = ["Lab Name", "Capacity", ""];
  const lab: ILab = {id: 21, name: "Mock Lab11", capacity: 10};
  useEffect(() => {
    // getLabsListApi().then((res) => {
    //   console.log(res);
    // });
    
  }, []);
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
        University Labs
      </Box>
      <Card
        sx={{
          padding: "25px",
          bgcolor: "White",
          borderRadius: "15px",
        }}>
        <TableContainer sx={{ borderRadius: "15px" }}>
          <Table>
            <TableHead sx={{ color: "#F5F5F5" }}>
              <TableRow>
                {tableHeader.map((value, index) => (
                  <StyledTableCell
                    sx={{ fontSize: 16 }}
                  >{value}</StyledTableCell>
                ))
                }
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
