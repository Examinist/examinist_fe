import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TemplateCard from "./components/TemplateCard";
import {
  IExamTemplateResponse,
  getExamTemplateApi,
} from "../../../../services/APIs/CourseSettingsAPIs";
import { IErrorResponse } from "../../../../services/Response";
import { useParams } from "react-router-dom";
import { IExamTemplate } from "../../../../types/CourseSettings";
import { DifficultyLevelEnum } from "../../../../types/Question";
import theme from "../../../../../assets/theme";

export interface IItem {
  id?: number;
  name: string;
  percent: number;
}
const colors = [
  theme.palette.green.main,
  theme.palette.yellow.main,
  theme.palette.red.main,
];

const getDifficultyLevels: (template: IExamTemplate) => IItem[] = (
  template
) => {
  return [
    { name: DifficultyLevelEnum.EASY, percent: template.easy },
    { name: DifficultyLevelEnum.MEDIUM, percent: template.medium },
    { name: DifficultyLevelEnum.HARD, percent: template.hard },
  ];
};

const getQuestionTypes: (template: IExamTemplate) => IItem[] = (template) => {
  return template.question_types.map((type) => ({
    id: type.id,
    name: type.name,
    percent: type.ratio,
  }));
};

const sortById: (items: IItem[]) => IItem[] = (items) => {
  return items.sort((a, b) => a.id! - b.id!);
};

export default function Template() {
  const { courseId } = useParams<{ courseId: string }>();
  const [questionTypes, setQuestionTypes] = useState<IItem[]>([]);
  const [difficultyLevels, setDifficultyLevels] = useState<IItem[]>([]);

  const mapExamTemplate = (exam_template: IExamTemplate) => {
    setQuestionTypes(sortById(getQuestionTypes(exam_template)));
    setDifficultyLevels(getDifficultyLevels(exam_template));
  };

  const loadExamTemplate = () => {
    getExamTemplateApi(courseId)
      .then(({ data }: IExamTemplateResponse) => {
        mapExamTemplate(data.exam_template);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
      });
  };

  useEffect(() => {
    loadExamTemplate();
  }, []);

  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          mb: 4,
        }}
      >
        Exam Template
      </Typography>
      {questionTypes.length > 0 && (
        <TemplateCard
          onSuccess={mapExamTemplate}
          title={"Question Types"}
          items={questionTypes}
          colors={[]}
        ></TemplateCard>
      )}
      {difficultyLevels.length > 0 && (
        <TemplateCard
          onSuccess={mapExamTemplate}
          title={"Difficulty Levels"}
          items={difficultyLevels}
          colors={colors}
        ></TemplateCard>
      )}
    </Box>
  );
}
