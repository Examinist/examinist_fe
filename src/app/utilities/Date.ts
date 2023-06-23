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

declare global {
  interface Date {
    stdTimezoneOffset: () => number;
    isDstObserved: () => boolean;
  }
}

Date.prototype.stdTimezoneOffset = function () {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  console.log(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};
