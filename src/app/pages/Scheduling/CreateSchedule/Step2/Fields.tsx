import * as yup from "yup";
import { IBusyLab, ILab } from "../../../../types/Lab";
import dayjs, { Dayjs } from "dayjs";
import { IExam } from "../../../../types/Exam";
import { getDateStr } from "../../../../utilities/Date";

export interface IExamInputs {
    date: Dayjs,
    time: Dayjs,
    labs: number[],
}

export interface IScheduleFormInput {
    list: IExamInputs[],
}

export const mapToScheduleForm = (items: IExam[]) => {
    var res: IExamInputs[] = []
    items.forEach((value) => {
        var item = { date: dayjs(getDateStr(value.scheduled_date)), time: dayjs(getDateStr(value.scheduled_date)), labs: value.busy_labs ? value.busy_labs.map((value) => value.id) : [] }
        res.push(item)
    })
    return res
}

const getScheduleDate = (date: Dayjs, time: Dayjs) => {
    var newDate: Date = date.toDate();
    newDate.setHours(time.hour(), time.minute(), time.second(), time.millisecond())
    return newDate
}

export const mapToExam = (items: IExamInputs[], exams: IExam[], labs: ILab[]) => {
    items.forEach((value, index) => {
        exams[index].scheduled_date = getScheduleDate(value.date, value.time)
        //exams[index].busy_labs = value.labs.map((ind) => labs.find((val) => val.id === ind ))
    })
    return exams
}

export const schema = yup.object().shape({
    list: yup.array().of(
      yup.object().shape({
        date: yup.date()
        .required("From date is required")
        .typeError("From date is required"),
        time: yup.date().required("Time is required").typeError("Time is required"),
        labs: yup.array().min(1, "Labs is required"),
      })
    ),
  });