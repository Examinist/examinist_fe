import dayjs, { Dayjs } from "dayjs";
import { Path } from "react-hook-form";
import * as yup from "yup";
import { getDateStr } from "../../../../../utilities/Date";

export interface IFormInput {
  fromDate: Dayjs;
  toDate: Dayjs;
  time: Dayjs;
  weekDays: string[];
  labsIds: number[];
  holidayDates: Date[];
}

export const schema = yup.object().shape({
  fromDate: yup
    .date()
    .required("From date is required")
    .typeError("From date is required"),
  toDate: yup
    .date()
    .required("To date is required")
    .typeError("To date is required")
    .min(yup.ref("fromDate"), "To date must be after from date"),
  time: yup.date().required("Time is required").typeError("Time is required"),
  weekDays: yup.array().min(1, "Week days is required"), 
  labsIds: yup.array().min(1, "Labs is required"),
  holidayDates: yup.array(),
  
});

export const initialValues: IFormInput = {
  fromDate: dayjs(getDateStr(new Date(Date.now()))),
  toDate: dayjs(""),
  time: dayjs(""),
  weekDays: [],
  labsIds: [],
  holidayDates: [],
};
export type FieldPath = Path<IFormInput>;