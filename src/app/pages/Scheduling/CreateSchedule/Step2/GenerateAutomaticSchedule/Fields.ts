import dayjs, { Dayjs } from "dayjs";
import { Path } from "react-hook-form";
import * as yup from "yup";
import { getDateStr } from "../../../../../utilities/Date";

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
    .typeError("To date is required")
    .min(yup.ref("schedule_from"), "To date must be after from date"),
  exam_starting_time: yup
    .date()
    .required("Time is required")
    .typeError("Time is required"),
  exam_week_days: yup.array().min(1, "Week days is required"),
  labs_ids: yup.array().min(1, "Labs is required"),
  holiday_dates: yup.array(),
});

export const initialValues: IFormInput = {
  schedule_from: dayjs(getDateStr(new Date(Date.now()))),
  schedule_to: dayjs(""),
  exam_starting_time: dayjs(""),
  exam_week_days: [],
  labs_ids: [],
  holiday_dates: [],
};
export type FieldPath = Path<IFormInput>;
