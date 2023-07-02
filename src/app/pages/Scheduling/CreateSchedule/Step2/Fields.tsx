import * as yup from "yup";
import { IBusyLab, ILab } from "../../../../types/Lab";
import dayjs, { Dayjs } from "dayjs";
import { IExam } from "../../../../types/Exam";
import { getDateStr } from "../../../../utilities/Date";

export interface IExamInputs {
  date: Dayjs | null;
  time: Dayjs | null;
  labs: number[];
}

export interface IScheduleFormInput {
  list: IExamInputs[];
}

export const mapToScheduleForm = (items: IExam[]) => {
  var res: IExamInputs[] = [];
  items.forEach((value) => {
    var item = {
      date: value.scheduled_date
        ? dayjs(getDateStr(value.scheduled_date))
        : null,
      time: value.scheduled_date
        ? dayjs(getDateStr(value.scheduled_date))
        : null,
      labs: value.busy_labs ? value.busy_labs.map((value) => value.id) : [],
    };
    res.push(item);
  });
  return res;
};

const getScheduleDate = (date: Dayjs, time: Dayjs) => {
  var newDate: Date = date.toDate();
  newDate.setHours(
    time.hour(),
    time.minute(),
    time.second(),
    time.millisecond()
  );
  return newDate;
};

export const mapToExam = (
  items: IExamInputs[],
  exams: IExam[],
  labs: ILab[]
) => {
  items.forEach((item, index) => {
    exams[index].scheduled_date = getScheduleDate(item.date!, item.time!);
    let busy_labs: IBusyLab[] = [];
    item.labs.forEach((id) => {
      busy_labs.push({
        id: id,
        name: labs.find((val) => val.id === id)?.name || "",
      });
    });
    exams[index].busy_labs = busy_labs;
  });
  return exams;
};

export const schema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      date: yup
        .object()
        .required("Date is required")
        .typeError("Date is required"),
      time: yup
        .object()
        .required("Time is required")
        .typeError("Time is required"),
      labs: yup.array().min(1, "At least 1 lab required"),
    })
  ),
});
