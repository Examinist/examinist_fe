import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../../../assets/theme";
import SearchBar from "./SearchBar";
import SelectBox, { ISelectBox } from "./SelectBox";
import QuestionAccordion from "./QuestionAccordion";
const selectBoxes: ISelectBox[] = [
  {
    title: "Group 1",
    options: [
      {
        name: "name",
        value: "value1",
      },
      {
        name: "name2",
        value: "value2",
      },
      {
        name: "name3",
        value: "value3",
      },
    ],
  },
  {
    title: "Group 1",
    options: [
      {
        name: "name",
        value: "value1",
      },
      {
        name: "name2",
        value: "value2",
      },
      {
        name: "name3",
        value: "value3",
      },
    ],
  },
  {
    title: "Group 1",
    options: [
      {
        name: "name",
        value: "value1",
      },
      {
        name: "name2",
        value: "value2",
      },
      {
        name: "name3",
        value: "value3",
      },
    ],
  },
];

export default function QuestionBank() {
  const addNewQuestion = () => {};
  return (
    <div>
      <Box>
        <Grid container direction="column">
          <Grid item xs>
            <Grid spacing={12} container direction="row">
              <Grid item xs={8}>
                <SearchBar />
              </Grid>
              <Grid item xs={4} md={3}>
                <Button
                  variant="outlined"
                  onClick={addNewQuestion}
                  sx={{
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.white.main,
                    width: "100%",
                    height: "80%",
                    marginTop: "7px",
                    border: 1,
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "10px",
                  }}
                >
                  Add new question
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid direction="row" container columns={{ xs: 4, sm: 4, md: 16 }}>
            {selectBoxes.map((box) => {
              return (
                <Grid item xs={4}>
                  <SelectBox title={box.title} options={box.options} />
                </Grid>
              );
            })}
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={12}
            paddingTop={2}
          >
            <Grid item xs>
              <QuestionAccordion />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
