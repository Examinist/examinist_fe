import {
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { IQuestion } from "../../../types/Question";
  import QuestionAccordion from "../QuestionBank/QuestionAccordion";
  import theme from "../../../../assets/theme";
  import QuestionBankDialog from "./QuestionBankDialog";
  import { useNavigate } from "react-router-dom";
  
  export default function QuestionsBody() {
    return (
      <Box
        sx={{ width: "100%", backgroundColor: theme.palette.background.default }}
      >
        <Grid container sx={{ pl: 2 }}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  color={theme.palette.gray.dark}
                  sx={{ fontWeight: 700 }}
                >
                  Questions:
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <QuestionBankDialog />
                  </Grid>
                  <Grid item>
                    <QuestionBankDialog />
                   </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
  