import dayjs, { Dayjs } from "dayjs";
import { Path, get } from "react-hook-form";
import * as yup from "yup";
import { getDateStr } from "../../../../../utilities/Date";
import { IAutomaticSchedulePayload } from "../../../../../services/APIs/ScheduleAPIs";
import { IExam } from "../../../../../types/Exam";

export interface IFormInput {
  schedule_from: Dayjs;
  schedule_to: Dayjs;
  exam_starting_time: Dayjs;
  exam_week_days: string[];
  labs_ids: number[];
  holiday_dates: Date[];
}

export const schema = yup.object().shape({
  schedule_from: yup
    .date()
    .required("From date is required")
    .typeError("From date is required"),
  schedule_to: yup
    .date()
    .required("To date is required")
    .typeError("To date is required"),

  exam_starting_time: yup
    .object()
    .required("Time is required")
    .typeError("Time is required"),
  exam_week_days: yup.array().min(1, "Week days is required"),
  labs_ids: yup.array().min(1, "Labs is required"),
  holiday_dates: yup.array(),
});

export const initialValues: IFormInput = {
  schedule_from: dayjs(Date.now()),
  schedule_to: dayjs(""),
  exam_starting_time: dayjs(""),
  exam_week_days: [],
  labs_ids: [],
  holiday_dates: [],
};
export type FieldPath = Path<IFormInput>;

const mapDate = (date: Date) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const mapInput: (
  input: IFormInput,
  title: string,
  exams: IExam[]
) => IAutomaticSchedulePayload = (
  input: IFormInput,
  title: string,
  exams: IExam[]
) => {
  let payload: IAutomaticSchedulePayload = {
    schedule_from: mapDate(input.schedule_from as unknown as Date),
    schedule_to: mapDate(input.schedule_to as unknown as Date),
    exam_starting_time: input.exam_starting_time.format("HH:mm"),
    exam_week_days: input.exam_week_days.map((day) => day.toLowerCase()),
    lab_ids: input.labs_ids,
    title: title,
    exam_ids: exams.map((exam) => exam.id),
    holiday_dates: input.holiday_dates.map((date) => mapDate(date)),
  };
  return payload;
};
