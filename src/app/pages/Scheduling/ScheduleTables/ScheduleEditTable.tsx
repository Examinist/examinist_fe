import React from "react";
import { IScheduleTableProps } from "./ScheduleReviewTable";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import theme from "../../../../assets/theme";
import ScheduleEditRow from "./ScheduleEditRow";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";

export default function ScheduleEditTable({ examList }: IScheduleTableProps) {
    const header = ["ID", "Title", "Course", "Number of Students", "Duration", "Scheduled Date", "Start Time", "End Time", "Labs"];
    const [exams, setExams] = React.useState(examList);
    const { control } = useFormContext<IScheduleFormInput>();
    const { fields } = useFieldArray({
        control,
        name: "list",
    });

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {header.map((value,index) =>
                            <TableCell
                            key={index}
                                align="center"
                                sx={{
                                    color: theme.palette.gray.dark,
                                    fontWeight: "medium"
                                }}
                            >{value}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map((field, index) =>
                        <ScheduleEditRow
                        key={field.id}
                        value={exams[index]} index={index}></ScheduleEditRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}