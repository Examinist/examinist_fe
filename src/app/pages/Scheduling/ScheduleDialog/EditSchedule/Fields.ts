import { IScheduleFormInput } from "../../CreateSchedule/Step2/Fields";
import * as yup from "yup";
import { IBusyLab, ILab } from "../../../../types/Lab";
import {
  IScheduleLabPayload,
  IUpdateSchedulePayload,
} from "../../../../services/APIs/ScheduleAPIs";
import { IDetailedSchedule } from "../../../../types/Schedule";
import { dayjsToDate } from "../../../../utilities/Date";

export interface IEditScheduleFormInput extends IScheduleFormInput {
  title: string;
}

export const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
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

export const getLabsPayload: (
  newLabs: string[],
  originalLabs: IBusyLab[],
  universityLabs: ILab[]
) => IScheduleLabPayload[] = (newLabs: string[], originalLabs: IBusyLab[], universityLabs: ILab[]) => {
  let payload: IScheduleLabPayload[] = [];

  originalLabs.forEach((lab) => {
    if (!newLabs.includes(lab.name)) {
      payload.push({
        id: lab.id,
        _destroy: true,
      });
    }
  });

  newLabs.forEach((labName) => {
    if (!originalLabs.find((l) => l.name === labName)) {
      payload.push({
        lab_id: universityLabs.find((l) => l.name === labName)?.id!,
      });
    }
  });
  return payload;
};

export const getSchedulePayload: (
  formInput: IEditScheduleFormInput,
  originalSchedule: IDetailedSchedule,
  universityLabs: ILab[]
) => IUpdateSchedulePayload = (
  formInput: IEditScheduleFormInput,
  originalSchedule: IDetailedSchedule,
  universityLabs: ILab[]
) => {
  let schedulePayload: IUpdateSchedulePayload = {
    title: formInput.title,
    exams_attributes: [],
  };
  formInput.list.forEach((formExam) => {
    const originalExam = originalSchedule.exams.find(
      (e) => e.id === formExam.id
    );
    schedulePayload.exams_attributes.push({
      id: formExam.id,
      starts_at: dayjsToDate(formExam.date!, formExam.time!),
      _force: false,
      busy_labs_attributes: getLabsPayload(
        formExam.labs,
        originalExam?.busy_labs || [],
        universityLabs
      ),
    });
  });
  return schedulePayload;
};
