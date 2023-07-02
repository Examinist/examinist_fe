import * as yup from "yup";
import { IBusyLab, ILab } from "../../../../types/Lab";
import dayjs, { Dayjs } from "dayjs";
import { IExam } from "../../../../types/Exam";
import { getDateStr } from "../../../../utilities/Date";

export interface IExamInputs {
  id: number;
  date: Dayjs | null;
  time: Dayjs | null;
  labs: string[];
}

export interface IScheduleFormInput {
  list: IExamInputs[];
}

export const mapToScheduleForm = (items: IExam[]) => {
  var res: IExamInputs[] = [];
  items.forEach((value, index) => {
    var item = {
      id: value.id,
      date: value.scheduled_date
        ? dayjs(value.scheduled_date.toDateString())
        : null,
      time: value.scheduled_date
        ? dayjs(value.scheduled_date.toDateString())
        : null,
      labs: value.busy_labs ? value.busy_labs.map((value) => value.name) : [],
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
  items.forEach((item) => {
    var index = exams.findIndex((val) => val.id === item.id);
    exams[index].scheduled_date = getScheduleDate(item.date!, item.time!);
    let busy_labs: IBusyLab[] = [];
    item.labs.forEach((name) => {
      busy_labs.push({
        id: labs.find((val) => val.name === name)?.id!,
        name: name,
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
