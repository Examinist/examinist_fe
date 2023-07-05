import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { IExam } from "../../../../types/Exam";
import theme from "../../../../../assets/theme";
import { useFormContext } from "react-hook-form";
import { IFormInputs } from "./Fields";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const examColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, type: "number" },
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "course",
    headerName: "Course",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.course.title || ""}`,
  },
  { field: "duration", headerName: "Duration(mins)", width: 200 },
  { field: "number_of_students", headerName: "Number of Students", width: 200 },
];

export default function ExamsTable({ exams }: { exams: IExam[] }) {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const { setValue, getValues, clearErrors } = useFormContext<IFormInputs>();
  useEffect(() => {
    setRowSelectionModel(getValues("exams_ids"));
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          fontSize: "1.1rem",
          fontWeight: "400",
          color: theme.palette.gray.dark,
          alignSelf: "center",
          mb: 1,
        }}
      >
        Unscheduled Exams
      </Box>

      <DataGrid
        rows={exams}
        columns={examColumns}
      
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          setValue(
            "exams_ids",
            newRowSelectionModel.map((id) => id.valueOf() as number)
          );
          clearErrors("exams_ids");
          console.log(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
      />
    </Box>
  );
}
