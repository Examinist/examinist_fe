import * as yup from "yup";
import { ILab } from "../../../../types/Lab";
import { IBusyLab } from "../../../../types/Schedule";

export interface IExamInputs {
    date: Date,
    time: Date,
    labs: ILab[]|IBusyLab[]|undefined,
}

export interface IScheduleFormInput {
    list: IExamInputs[],
}

