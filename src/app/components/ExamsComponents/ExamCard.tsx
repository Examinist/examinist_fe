import { Box, Card, Tab, Tabs } from "@mui/material";
import ExamsTable from "./ExamsTable";
import { ExamStatusEnum, IExam } from "../../types/Exam";
import { useState } from "react";

interface IExamCardProp {
    tabs: string[],
    tableHeader: string[],
    rows: IExam[],
    attributesFunction: (exam: IExam) => string[],
    actionButton: boolean,
    allExams: boolean,
    filter: (tabName: string, exams: IExam[]) => IExam[],
}

export default function ExamCard({ tabs, tableHeader, rows, attributesFunction, actionButton, allExams, filter }: IExamCardProp) {
    const [currTab, selectTab] = useState(0);
    const [tableRows, filterRows] = useState(rows);
    const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
        filterRows(filter(tabs[newTab], rows));
        selectTab(newTab);
    };

    return (
        <Card elevation={0}
        sx={{
            paddingRight: "24px",
            paddingLeft: "24px",
            paddingTop: "6px",
            borderRadius: "15px",
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currTab} onChange={handleChangeTab}
                >
                    {tabs.map((value, index) => (
                        <Tab
                            label={value}
                            sx={{
                                fontWeight: index==currTab ? "bold": "medium" ,
                                fontFamily: "montserrat",
                                textTransform: "none",
                                fontSize: "17px",
                                color: index==currTab ? "#1B84BF": "#969090" ,
                            }} />
                    ))}
                </Tabs>
            </Box>
            <ExamsTable
                tableHeader={tableHeader}
                rows={tableRows}
                attributesFunction={attributesFunction}
                actionButton={actionButton}
                allExams={allExams}
            ></ExamsTable>
        </Card>
    );
}