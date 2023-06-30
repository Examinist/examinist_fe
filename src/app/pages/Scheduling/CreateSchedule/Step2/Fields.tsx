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
    var res : IExamInputs[] = []
    items.forEach((value)=>{
        var item = {date:dayjs(getDateStr(value.scheduled_date)),time:dayjs(getDateStr(value.scheduled_date)),labs:value.busy_labs?value.busy_labs.map((value)=>value.id):[]}
        res.push(item)
    })
    return res
}