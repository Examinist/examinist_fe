import {Card} from "@mui/material";
import ExamsTable from "./ExamsTable";
import ExamsTabs from "./ExamsTabs";
import { IExam } from "../../types/Exam";

interface IExamCardProp{
    tabs: string[],
    tableHeader: string[],
    rows: IExam[],
    attributesFunction: (exam:IExam) => string[],
    actionButton: boolean,
    allExams: boolean,
}

export default function ExamCard({tabs, tableHeader, rows, attributesFunction, actionButton, allExams}: IExamCardProp){
    
    return(
        <Card sx={{
            paddingRight: "24px",
            paddingLeft: "24px"
            }}>
        <ExamsTabs tabs={tabs}></ExamsTabs>
        <ExamsTable
        tableHeader={tableHeader}
        rows={rows}
        attributesFunction={attributesFunction}
        actionButton={actionButton}
        allExams={allExams}
        ></ExamsTable>
      </Card>
    );
}