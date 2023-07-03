import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import theme from "../../../../assets/theme";
import { IExam } from "../../../types/Exam";
import { useNavigate } from "react-router-dom";
import { getFullDateStr } from "../../../utilities/Date";

interface IExamLabsCardProps {
  exam: IExam;
}

export default function ExamsLabsCard({ exam }: IExamLabsCardProps) {
  const navigate = useNavigate();

  const getLabsString = () => {
    var labs = "";
    exam.busy_labs?.map((value, index) => {
      if (index == exam.busy_labs!.length - 1) {
        labs = labs + value.name;
      } else {
        labs = labs + value.name + ", ";
      }
    });
    return labs;
  };

  return (
    <Box
      sx={{
        marginY: "20px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "15px",
        paddingY: "10px",
        paddingX: "15px",
      }}
    >
      {exam.pending_labs_assignment ? (
        <Chip
          label="Pending Labs Assignment"
          sx={{
            background: "#D9D9D9",
            fontWeight: "450",
            px: 2,
            py: 1,
          }}
        ></Chip>
      ) : (
        <></>
      )}
      <Box
        sx={{
          paddingY: "10px",
          paddingX: "15px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography
              sx={{
                fontSize: "22px",
                color: "#6B6767",
                fontWeight: "600",
              }}
            >
              {exam.title}
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="flex-end">
            <Typography
              sx={{
                paddingTop: "5px",
                fontSize: "18px",
                color: "#6B6767",
                fontWeight: "450",
              }}
            >
              {getFullDateStr(exam.scheduled_date)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ paddingX: "15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#6B6767",
                fontWeight: "500",
              }}
            >
              {"Course: " + exam.course.title + " - " + exam.course.code}
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="flex-end">
            <Typography
              sx={{
                paddingTop: "5px",
                fontSize: "18px",
                color: "#6B6767",
                fontWeight: "450",
              }}
            >
              {getLabsString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{
          paddingY: "10px",
          paddingX: "15px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "#1B84BF",
            backgroundColor: theme.palette.white.main,
            border: 1,
            borderRadius: "15px",
            fontWeight: "650",
            width: "130px",
            textTransform: "none",
          }}
          onClick={() => navigate(`./${exam.id}`, { state: { exam: exam } })}
        >
          View
        </Button>
      </Box>
    </Box>
  );
}
