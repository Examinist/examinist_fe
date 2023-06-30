import * as yup from "yup";

export interface IFormInputs {
  title: string;
  exams_ids: number[];
}

export const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    exams_ids: yup.array().min(1, "At least one exam is required")
});


