import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IExam } from "../../types/Exam";
import ExamTableRow from "./ExamTableRow";

interface IExamTableProp{
    tableHeader: string[],
    rows: IExam[],
    attributesFunction: (exam: IExam) => string[],
    actionButton: boolean,
    allExams: boolean,
}

export default function ExamsTable({tableHeader, rows, attributesFunction, actionButton, allExams}: IExamTableProp){
    
    return (
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map((value, index) => (
                <TableCell
                  key={value}
                  sx={{
                    fontWeight: "bold",
                    color: "#6B6767",
                    fontSize: "1.1rem",
                  }}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((exam, index) => {
              var attributes: string[] = attributesFunction(exam);
              return (
                <ExamTableRow
                  key={exam.id}
                  exam={exam}
                  attributes={attributes}
                  status={exam.status}
                  actionButton={actionButton}
                  allExams={allExams}
                ></ExamTableRow>
              );
            })}
          </TableBody>
        </Table>
        {rows.length == 0 && (
          <Box sx={{ p: 4, fontSize: "18wpx" }}>No exams to show</Box>
        )}
      </TableContainer>
    );
}
