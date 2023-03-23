import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react'


export interface IDifficultyLevel{
    level: "Easy" | "Medium" | "Hard"
    weight: number
}

interface IDifficultyLevelsTable{
    difficultyLevels: IDifficultyLevel[]
}

export default function DifficultyLevelsTable({difficultyLevels}: IDifficultyLevelsTable) {
  return (
    <TableContainer>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ mt: 0, pt: 0 }}>Level</TableCell>
            <TableCell align="left" sx={{ pt: 0 }}>
              Weight
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {difficultyLevels.map(({level, weight}) => (
            <TableRow
              key={level}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {level}
              </TableCell>
              <TableCell align="left">{weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
