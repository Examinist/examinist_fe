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
  if(!date){
    return ""
  }
  return date.toLocaleTimeString(undefined, timeOptions);
};

export const getFullDateStr = (date: Date) => {
  if(!date){
    return ""
  }
  return date.toLocaleDateString(undefined, fullDateOptions);
};

export const getDateStr = (date: Date) => {
  if(!date){
    return ""
  }
  return date.toLocaleDateString(undefined, dateOptions);
};

export const addTime = (date: Date, offset: number) => {
  return new Date(date.getTime() + offset * 60000);
}

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
