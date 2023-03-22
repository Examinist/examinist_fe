import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { SquareRounded } from "@mui/icons-material";

export default function Template() {
  const [questionType, updateTypePerc] = useState([
    { name: "MCQ", percent: 50 },
    { name: "T/F", percent: 50 },
  ]);
  const [percType, editPercType] = useState(questionType.map((value) => false));

  const [difficulty, updateDiffPerc] = useState([
    { level: "Easy", percent: 50 },
    { level: "Medium", percent: 30 },
    { level: "Hard", percent: 20 },
  ]);
  const [percDiff, editPercDiff] = useState([false, false, false]);

  const colors = ["#3FC164", "#FFAC4B", "#FF4B4B"];

  const openEditType = (index: number) => {
    let types = [...percType];
    types[index] = !types[index];
    editPercType(types);
  };

  const openEditDiff = (index: number) => {
    let diff = [...percDiff];
    diff[index] = !diff[index];
    editPercDiff(diff);
  };

  const handleTypeChange = (event: any, index: number) => {
    if (event.key == "Enter") {
      let types = [...questionType];
      types[index].percent = event.target.value;
      updateTypePerc(types);
      openEditType(index);
    }
  };

  const handleDiffChange = (event: any, index: number) => {
    if (event.key == "Enter") {
      let diff = [...difficulty];
      diff[index].percent = event.target.value;
      updateDiffPerc(diff);
      openEditDiff(index);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
        }}
      >
        Exam Templete
      </Typography>
      <Box
        sx={{
          marginTop: "10px",
          marginLeft: "20px",
          bgcolor: "White",
          borderRadius: "15px",
          paddingBottom: "8px",
        }}
      >
        <Typography
          sx={{
            marginLeft: "10px",
            paddingTop: "8px",
            fontSize: "23px",
          }}
        >
          Question Types
        </Typography>
        <List disablePadding>
          {questionType.map((value, index) => {
            return (
              <Box>
                <Divider sx={{ color: "#D9D9D9" }}></Divider>
                <ListItem
                  sx={{
                    paddingBottom: "5px",
                    paddingTop: "5px",
                  }}
                  secondaryAction={
                    <IconButton onClick={() => openEditType(index)}>
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <Grid container sx={{ marginLeft: "4px" }}>
                    <Grid item xs={3}>
                      <ListItemText
                        primary={value.name}
                        sx={{
                          color: "#6B6767",
                          width: "100%",
                          fontSize: "15px",
                          textTransform: "none",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      {percType[index] ? (
                        <TextField
                          onKeyDown={(event) => handleTypeChange(event, index)}
                          placeholder="%"
                          value={value.percent}
                          InputProps={{
                            sx: {
                              height: "30px",
                              "& input": { textAlign: "right" },
                            },
                          }}
                          sx={{
                            bgcolor: "#F5F5F5",
                            borderColor: "#D9D9D9",
                            width: "100%",
                            marginTop: "2px",
                          }}
                        />
                      ) : (
                        <ListItemText
                          primary={value.percent}
                          sx={{
                            color: "#6B6767",
                            width: "100%",
                            fontSize: "15px",
                            textTransform: "none",
                          }}
                        ></ListItemText>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          marginTop: "25px",
          marginLeft: "20px",
          bgcolor: "White",
          borderRadius: "15px",
          paddingBottom: "8px",
        }}
      >
        <Typography
          sx={{
            marginLeft: "10px",
            paddingTop: "8px",
            fontSize: "23px",
          }}
        >
          Difficulty Levels
        </Typography>
        <List disablePadding>
          {difficulty.map((value, index) => {
            return (
              <Box>
                <Divider sx={{ color: "#D9D9D9" }}></Divider>
                <ListItem
                  sx={{
                    paddingBottom: "5px",
                    paddingTop: "5px",
                  }}
                  secondaryAction={
                    <IconButton onClick={() => openEditDiff(index)}>
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon sx={{ minWidth: "30px", marginLeft: "2px" }}>
                    <SquareRounded
                      fontSize="medium"
                      sx={{
                        color: colors[index],
                      }}
                    ></SquareRounded>
                  </ListItemIcon>
                  <Grid container sx={{ marginLeft: "2px" }}>
                    <Grid item xs={3}>
                      <ListItemText
                        primary={value.level}
                        sx={{
                          color: "#6B6767",
                          width: "100%",
                          fontSize: "15px",
                          textTransform: "none",
                        }}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={3}>
                      {percDiff[index] ? (
                        <TextField
                          onKeyDown={(event) => handleDiffChange(event, index)}
                          placeholder="%"
                          value={value.percent}
                          InputProps={{
                            sx: {
                              height: "30px",
                              "& input": { textAlign: "right" },
                            },
                          }}
                          sx={{
                            bgcolor: "#F5F5F5",
                            borderColor: "#D9D9D9",
                            width: "100%",
                            marginTop: "2px",
                          }}
                        ></TextField>
                      ) : (
                        <ListItemText
                          primary={value.percent}
                          sx={{
                            color: "#6B6767",
                            width: "100%",
                            fontSize: "15px",
                            textTransform: "none",
                          }}
                        ></ListItemText>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
