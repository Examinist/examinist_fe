import {
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminAccordion from "./components/adminAccordion";
import { IUniversityFaculty } from "../../types/University";
import {
  IFacultiesListResponse,
  getFacultiesApi,
} from "../../services/APIs/FacultyAPIs";
import { IErrorResponse } from "../../services/Response";
import useAlert from "../../hooks/useAlert";
import CustomCircularProgress from "../../components/CustomCircularProgress";

export default function FacultyAdmins() {
  const [faculties, setFaculties] = useState<IUniversityFaculty[]>([]);
  const { setAlertState } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [lastChangedId, setLastChangedId] = useState<number>(-1);

  const loadFaculties = () => {
    setLoading(true);
    getFacultiesApi()
      .then(({ data }: IFacultiesListResponse) => {
        setFaculties(data.faculties);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

 const handleChange = (id: number) =>{
    loadFaculties();
    setLastChangedId(id);
  }

  useEffect(() => {
    loadFaculties();
  }, []);

  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          paddingBottom: "40px",
        }}
      >
        Faculties Admins
      </Box>
      {loading ? (
        <CustomCircularProgress />
      ) : (
        faculties.map((value) => (
          <AdminAccordion key={value.id} faculty={value} onChange={handleChange} isLastChanged={lastChangedId === value.id}></AdminAccordion>
        ))
      )}
    </Box>
  );
}
