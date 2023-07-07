import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { StudentExamStatusEnum } from "../../../../types/StudentPortalStudentExam";
import theme from "../../../../../assets/theme";

interface IExamsTabsProps {
  onChange: (newValue: string) => void;
}
export default function ExamsTabs({ onChange }: IExamsTabsProps) {
  const [value, setValue] = React.useState<string>(
    StudentExamStatusEnum.UPCOMING
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.white.main,
        border: 1,
        borderColor: theme.palette.gray.light,
        mb: 0.5,
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab value={StudentExamStatusEnum.UPCOMING} label="Upcomming" />
        <Tab value={StudentExamStatusEnum.ONGOING} label="Ongoing" />
        {/* <Tab
          value={StudentExamStatusEnum.PENDING_GRADING}
          label="Pending Grading"
        /> */}
        <Tab value={StudentExamStatusEnum.GRADED} label="Graded" />
      </Tabs>
    </Box>
  );
}
