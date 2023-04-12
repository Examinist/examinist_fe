import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import DifficultyLevelRow from "./DifficultyLevelRow";

interface IDifficultyLevelsTable {
  easy_weight?: number;
  medium_weight?: number;
  hard_weight?: number;
  edited?: boolean;
}



export default function DifficultyLevelsTable({
  easy_weight,
  medium_weight,
  hard_weight,
  edited = false,
}: IDifficultyLevelsTable) {
  return (
    <TableContainer>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ mt: 0, pt: 0 }}>Level</TableCell>
            <TableCell align="left" sx={{ ml: 10 }}>
              Weight
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <DifficultyLevelRow
            level={"Easy"}
            weight={easy_weight}
            edited={edited}
          ></DifficultyLevelRow>

          <DifficultyLevelRow
            level={"Medium"}
            weight={medium_weight}
            edited={edited}
          ></DifficultyLevelRow>

          <DifficultyLevelRow
            level={"Hard"}
            weight={hard_weight}
            edited={edited}
          ></DifficultyLevelRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
