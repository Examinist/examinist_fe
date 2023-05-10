import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Card,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IQuestionType {
  name: string;
  id: number;
}

const questionTypes: IQuestionType[] = [
  { name: "MCQ", id: 1 },
  { name: "T/F", id: 2 },
  { name: "Fill in the blanks", id: 3 },
  { name: "Short answer", id: 4 },
  { name: "Essay", id: 5 },
  { name: "Coding", id: 6 },
];

interface IFormInputs {
  questionType: string;
}

interface IQuestionFormProps{
  onNext: (questionType: string) => void;
}

export default function QuestionTypeForm({onNext}: IQuestionFormProps) {

  const {
    handleSubmit,
    control,
  } = useForm<IFormInputs>({
    defaultValues: {
      questionType: "MCQ",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    onNext(data.questionType);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          mt: '5%',
          ml: "auto",
          mr: "auto",
          maxWidth: 700,
          py: 5,
          px: 8,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          sx={{ fontSize: "25px", fontWeight: "500" }}
          color="#6B6767"
        >
          Add New Question
        </Typography>
        <FormLabel sx={{ pl: 2 }}>Select Question Type: </FormLabel>
        <FormControl>
          <Controller
            name="questionType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              
                <RadioGroup {...field}>
                  {questionTypes.map((questionType) => (
                    <div key={questionType.name}>
                    <FormControlLabel
                      sx={{ pl: 6, pb: 2 }}
                      value={questionType.name}
                      control={<Radio />}
                      label={questionType.name}
                    />
                    </div>
                  ))}
                </RadioGroup>
              
            )}
          ></Controller>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ ml: "auto", px: 4, borderRadius: 3 }}
          type="submit"
        >
          Next
        </Button>
      </Card>
    </form>
  );
}
