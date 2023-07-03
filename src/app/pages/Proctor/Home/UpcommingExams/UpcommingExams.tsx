
import { Stack, Box } from "@mui/system";

import ExamsTable from "./ExamsTable";
import { useState, useEffect } from "react";
import CustomCircularProgress from "../../../../components/CustomCircularProgress";
import useAlert from "../../../../hooks/useAlert";
import { IExamsListResponse, getProctorUpcommingExamsApi } from "../../../../services/APIs/ProctorAPIs";
import { IProctorPortalExam } from "../../../../types/ProctorPortalExam";

export default function UpcommingExams() {
  const [exams, setExams] = useState<IProctorPortalExam[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAlertState } = useAlert();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    getProctorUpcommingExamsApi(page)
      .then(({ data }: IExamsListResponse) => {
        setExams(data.exams);
        console.log(data);
        setPageCount(data.number_of_pages);
      })
      .catch(({ response: { data, statusText } }) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);
  return (
    <Stack sx={{ gap: 4 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Upcomming Exams
      </Box>
      {loading ? (
        <CustomCircularProgress />
      ) : (
        <ExamsTable
          exams={exams}
          onChangePage={(newPage) => {
            setPage(newPage);
          }}
          pagesCount={pageCount}
        />
      )}
    </Stack>
  );
}
