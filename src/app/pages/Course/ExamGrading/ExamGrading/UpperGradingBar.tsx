import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { Button, IconButton, LinearProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";

export default function UpperGradingBar() {
  const [submitWindowOpen, setSubmitWindowOpen] =
    React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        borderBottom: 1,
        borderBottomColor: theme.palette.gray.light,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ color: theme.palette.text.primary }}
              fontSize="inherit"
            />
          </IconButton>
          <h1 style={{  textAlign: "start" }}>{"title"}</h1>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 5,
            px: 3,
            fontWeight: 600,
          }}
          onClick={() => setSubmitWindowOpen(true)}
        >
          Save Changes
        </Button>
      </Box>
      <LinearProgress
        variant="determinate"
        color="success"
        sx={{
          height: 10,
          borderRadius: 0,
        }}
        // value={(solvedQuestionsCount / questionsCount) * 100}
      />
      {/* <SubmitExamDialog
        open={submitWindowOpen}
        onClose={() => setSubmitWindowOpen(false)}
      /> */}
    </Box>
  );
}
