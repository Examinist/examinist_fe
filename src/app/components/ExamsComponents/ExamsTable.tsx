import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
    
    return(
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
              {rows.map((exam, index) => {
                var attributes: string[] = attributesFunction(exam);
                return(<ExamTableRow attributes={attributes}
                status={exam.status}
                actionButton={actionButton}
                allExams={allExams}
                ></ExamTableRow>);
              }
                
              )
              }
            </TableBody>
          </Table>
        </TableContainer>
    );
}
