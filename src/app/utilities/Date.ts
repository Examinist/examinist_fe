import { IExam } from "../types/Exam";
import dayjs, { Dayjs } from "dayjs";

export const fullDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "long",
};

export const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const getTimeStr = (date: Date) => {
  if (!date) {
    return "--";
  }
  return date.toLocaleTimeString("en-IN", timeOptions);
};

export const getFullDateStr = (date: Date) => {
  if (!date) {
    return "--";
  }
  return date.toLocaleDateString("en-IN", fullDateOptions);
};

export const getDateStr = (date: Date) => {
  if (!date) {
    return "--";
  }
  return date.toLocaleDateString("en-IN", dateOptions);
};

export const addTime = (date: Date, offset: number) => {
  return new Date(date.getTime() + offset * 60000);
};

declare global {
  interface Date {
    stdTimezoneOffset: () => number;
    isDstObserved: () => boolean;
  }
}

Date.prototype.stdTimezoneOffset = function () {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  console.log(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

export const fixExamDate = (exam: IExam) => {
  return {
    ...exam,
    created_at: new Date(exam.created_at),
    scheduled_date: exam.scheduled_date && new Date(exam.scheduled_date),
  };
};

export const dayjsToDate = (date: Dayjs, time?: Dayjs) => {
  var newDate: Date = date.toDate();
  if (!time) return newDate;
  newDate.setHours(
    time.hour(),
    time.minute(),
    time.second(),
    time.millisecond()
  );
  return newDate;
};
