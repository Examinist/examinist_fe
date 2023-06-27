import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "../../../../assets/theme";
import { examContext } from "../ExamCreation/Models";
import { useContext } from "react";
import SummaryInfo from "./SummaryInfo";
import SummaryQuestions from "./SummaryQuestion";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Summary() {
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        px: 6,
        py: 4,
        borderRadius: 5,
        width: "100%",
        height: "100%",
      }}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Typography
        variant="h5"
        color={theme.palette.gray.dark}
        sx={{ fontWeight: 700,pb:4 }}
      >
        Summary :
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Exam Details"
            {...a11yProps(0)}
            sx={{ width: "50%", minWidth: 0 }}
          />
          <Tab
            label="Questions Summary"
            {...a11yProps(1)}
            sx={{ width: "50%", minWidth: 0 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SummaryInfo/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SummaryQuestions/>
      </TabPanel>
    </Box>
  );
}
