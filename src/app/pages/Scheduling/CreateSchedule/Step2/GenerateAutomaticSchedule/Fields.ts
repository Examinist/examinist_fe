import dayjs,{ Dayjs } from "dayjs";
import { Path } from "react-hook-form";
import * as yup from "yup";
import { getDateStr } from '../../../../../utilities/Date';

export interface IFormInput {
    fromDate: Dayjs;
    toDate: Dayjs;
    time: Dayjs;
}

export const schema = yup.object().shape({
    fromDate: yup.date().required("From date is required").typeError("From date is required"),
    toDate: yup.date().required("To date is required").typeError("To date is required")
        .min(yup.ref("fromDate"), "To date must be after from date"),
    time: yup.date().required("Time is required").typeError("Time is required")

});

export const initialValues: IFormInput = {
  fromDate: dayjs(getDateStr(new Date(Date.now()))),
  toDate: dayjs(''),
  time: dayjs(''),
};
export type FieldPath= Path<IFormInput>;
