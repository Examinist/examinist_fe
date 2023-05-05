import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TemplateElement from "./TemplateElement";
import ConfirmIcons from "../../Topics/components/ConfirmIcons";
import { IItem } from "../Template";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IEditExamTemplate, IExamTemplate } from "../../../../../types/Exam";
import {
  IExamTemplateResponse,
  updateExamTemplateApi,
} from "../../../../../services/APIs/CourseSettingsAPIs";
import { useParams } from "react-router-dom";
import { IErrorResponse } from "../../../../../services/Response";
import { IAlertState } from "../../../../../components/UpdateAlert/UpdateAlert";
import UpdateAlert from "../../../../../components/UpdateAlert/UpdateAlert";

interface ITemplateCardProps {
  title: string;
  items: IItem[];
  colors: string[];
  onSuccess: (exam_template: IExamTemplate) => void;
}

export interface IFormInput {
  list: IItem[];
}

const schema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      percent: yup.number().required().min(0).max(100),
    })
  ),
});

const mapQuestionTypes: (items: IItem[]) => IEditExamTemplate = (items) => {
  return {
    question_types_attributes: items.map((item) => ({
      id: item.id!,
      ratio: item.percent,
    })),
  };
};
const mapDifficultyLevels: (items: IItem[]) => IEditExamTemplate = (items) => {
  return {
    easy: items[0].percent,
    medium: items[1].percent,
    hard: items[2].percent,
  };
};

export default function TemplateCard({
  title,
  items,
  colors,
  onSuccess,
}: ITemplateCardProps) {
  const { courseId } = useParams<{ courseId: string }>();
  const [edit, setEdit] = useState(false);
  const [alertState, setAlertState] = useState<IAlertState>({
    open: false,
    message: "",
  });

  const methods = useForm<IFormInput>({
    defaultValues: {
      list: items,
    },
    resolver: yupResolver(schema),
  });

  const { control, handleSubmit, reset } = methods;

  const { fields } = useFieldArray({
    control,
    name: "list",
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    let edited_exam_template: IEditExamTemplate = {};
    if (title === "Question Types") {
      edited_exam_template = mapQuestionTypes(data.list);
    } else {
      edited_exam_template = mapDifficultyLevels(data.list);
    }
    updateExamTemplateApi(courseId, edited_exam_template)
      .then(({ data: { exam_template } }: IExamTemplateResponse) => {
        console.log(exam_template);
        onSuccess(exam_template);
        setAlertState({
          open: true,
          message: "Exam template updated successfully",
          severity: "success",
        });
        setEdit(!edit);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        console.log(status, statusText);
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            mb: 4,
            px: 2,
            bgcolor: "White",
            borderRadius: "15px",
            py: 1,
          }}
        >
          <ListItem
            secondaryAction={
              edit ? (
                <ConfirmIcons
                  isSubmit={true}
                  cancelHandler={() =>{reset(); setEdit(!edit);}}
                  confirmChange={() => {}}
                />
              ) : (
                <IconButton onClick={() => setEdit(!edit)}>
                  <EditIcon />
                </IconButton>
              )
            }
          >
            <Typography
              sx={{
                fontSize: "23px",
              }}
            >
              {title}
            </Typography>
          </ListItem>
          <List disablePadding>
            {fields.map((item, index) => (
              <div key={item.id}>
                {title === "Question Types" ? (
                  <TemplateElement
                    showIcon={false}
                    index={index}
                    editPercent={edit}
                    difficultyColor={""}
                  ></TemplateElement>
                ) : (
                  <TemplateElement
                    showIcon={true}
                    index={index}
                    editPercent={edit}
                    difficultyColor={colors[index]}
                  ></TemplateElement>
                )}
              </div>
            ))}
          </List>
        </Box>
        <UpdateAlert alertState={alertState} setAlertState={setAlertState} />
      </form>
    </FormProvider>
  );
}
