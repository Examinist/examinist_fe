import React from "react";
import { IBusyLab } from "../../../types/Lab";
import { TableRow, TableCell, Button } from "@mui/material";
import ProctorSelector from "./ProctorSelector";

interface IExamLabsRowProps {
  lab: IBusyLab;
  onViewStudents: (lab: IBusyLab) => void;
}

export default function ExamLabsRow({
  lab,
  onViewStudents,
}: IExamLabsRowProps) {
  return (
    <TableRow >
      <TableCell align="left" sx={{ fontSize: "17px" }}>
        {lab.name}
      </TableCell>
      <TableCell style={{ width: "50%" }} sx={{ fontSize: "17px" }}>
        <ProctorSelector lab={lab}></ProctorSelector>
      </TableCell>
      <TableCell align="left" width="20%" sx={{ fontSize: "17px" }}>
        <Button
          onClick={() => onViewStudents(lab)}
          sx={{
            border: 1,
            borderRadius: "15px",
            textTransform: "none",
            px: 3,
          }}
        >
          View Students
        </Button>
      </TableCell>
    </TableRow>
  );
}
