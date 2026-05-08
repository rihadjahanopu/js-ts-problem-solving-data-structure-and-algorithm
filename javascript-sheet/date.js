Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

console.log("Hello, World! Me");

Date.prototype.subtractDays = function (days) {
  return this.addDays(-days);
};

Date.prototype.format = function (formatString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return this.toLocaleDateString("en-US", options).replace(
    /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/,
    (match, mm, dd, yyyy, hh, min, ss) => {
      return formatString
        .replace("YYYY", yyyy)
        .replace("MM", mm)
        .replace("DD", dd)
        .replace("HH", hh)
        .replace("mm", min)
        .replace("ss", ss);
    },
  );
};

Date.prototype.isLeapYear = function () {
  const year = this.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

Date.prototype.daysInMonth = function () {
  const month = this.getMonth();
  const year = this.getFullYear();
  return new Date(year, month + 1, 0).getDate();
};

Date.prototype.startOfMonth = function () {
  return new Date(this.getFullYear(), this.getMonth(), 1);
};

Date.prototype.endOfMonth = function () {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0);
};

Date.prototype.diffInDays = function (otherDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffInTime = this.getTime() - otherDate.getTime();
  return Math.round(diffInTime / oneDay);
};

Date.prototype.isSameDay = function (otherDate) {
  return (
    this.getFullYear() === otherDate.getFullYear() &&
    this.getMonth() === otherDate.getMonth() &&
    this.getDate() === otherDate.getDate()
  );
};

Date.prototype.clone = function () {
  return new Date(this.getTime());
};

Date.prototype.addMonths = function (months) {
  var date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};

Date.prototype.subtractMonths = function (months) {
  return this.addMonths(-months);
};

Date.prototype.addYears = function (years) {
  var date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() + years);
  return date;
};

Date.prototype.subtractYears = function (years) {
  return this.addYears(-years);
};

Date.prototype.isWeekend = function () {
  const day = this.getDay();
  return day === 0 || day === 6;
};

Date.prototype.isWeekday = function () {
  return !this.isWeekend();
};

Date.prototype.nextWeekday = function () {
  let date = this.clone();
  do {
    date = date.addDays(1);
  } while (date.isWeekend());
  return date;
};

Date.prototype.previousWeekday = function () {
  let date = this.clone();
  do {
    date = date.subtractDays(1);
  } while (date.isWeekend());
  return date;
};

Date.prototype.toISOStringDate = function () {
  return this.toISOString().split("T")[0];
};

Date.prototype.toISOStringTime = function () {
  return this.toISOString().split("T")[1].split("Z")[0];
};

Date.prototype.setToStartOfDay = function () {
  const date = new Date(this.valueOf());
  date.setHours(0, 0, 0, 0);
  return date;
};

Date.prototype.setToEndOfDay = function () {
  const date = new Date(this.valueOf());
  date.setHours(23, 59, 59, 999);
  return date;
};

Date.prototype.weeksInYear = function () {
  const yearStart = new Date(this.getFullYear(), 0, 1);
  const yearEnd = new Date(this.getFullYear(), 11, 31);
  const daysInYear = (yearEnd - yearStart) / (1000 * 60 * 60 * 24) + 1;
  return Math.ceil(daysInYear / 7);
};

Date.prototype.getWeekNumber = function () {
  const firstDayOfYear = new Date(this.getFullYear(), 0, 1);
  const pastDaysOfYear = (this - firstDayOfYear) / (1000 * 60 * 60 * 24);
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

Date.prototype.isBefore = function (otherDate) {
  return this.getTime() < otherDate.getTime();
};

Date.prototype.isAfter = function (otherDate) {
  return this.getTime() > otherDate.getTime();
};

Date.prototype.isBetween = function (startDate, endDate) {
  return this.isAfter(startDate) && this.isBefore(endDate);
};

Date.prototype.getQuarter = function () {
  return Math.floor(this.getMonth() / 3) + 1;
};

Date.prototype.startOfQuarter = function () {
  const quarter = this.getQuarter();
  return new Date(this.getFullYear(), (quarter - 1) * 3, 1);
};

Date.prototype.endOfQuarter = function () {
  const quarter = this.getQuarter();
  return new Date(this.getFullYear(), quarter * 3, 0);
};

Date.prototype.addWeeks = function (weeks) {
  return this.addDays(weeks * 7);
};

Date.prototype.subtractWeeks = function (weeks) {
  return this.subtractDays(weeks * 7);
};

Date.prototype.isSameMonth = function (otherDate) {
  return (
    this.getFullYear() === otherDate.getFullYear() &&
    this.getMonth() === otherDate.getMonth()
  );
};

Date.prototype.isSameYear = function (otherDate) {
  return this.getFullYear() === otherDate.getFullYear();
};

Date.prototype.toUnixTimestamp = function () {
  return Math.floor(this.getTime() / 1000);
};

Date.prototype.fromUnixTimestamp = function (timestamp) {
  return new Date(timestamp * 1000);
};

Date.prototype.getDayOfYear = function () {
  const start = new Date(this.getFullYear(), 0, 0);
  const diff = this - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

Date.prototype.setUTCToLocal = function () {
  return new Date(this.getTime() + this.getTimezoneOffset() * 60000);
};

Date.prototype.setLocalToUTC = function () {
  return new Date(this.getTime() - this.getTimezoneOffset() * 60000);
};

Date.prototype.getTimezoneAbbreviation = function () {
  return this.toString().match(/\(([^)]+)\)$/)[1];
};

Date.prototype.isDST = function () {
  const jan = new Date(this.getFullYear(), 0, 1);
  const jul = new Date(this.getFullYear(), 6, 1);
  return (
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) !==
    this.getTimezoneOffset()
  );
};

Date.prototype.getISOWeekDate = function () {
  const target = new Date(this.valueOf());
  const dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const weekNumber = Math.ceil(((target - firstThursday) / 86400000 + 1) / 7);
  return {
    year: target.getFullYear(),
    week: weekNumber,
    day: dayNr + 1,
  };
};

Date.prototype.setISOWeekDate = function (isoYear, isoWeek, isoDay) {
  const simple = new Date(isoYear, 0, 1 + (isoWeek - 1) * 7);
  const dayOfWeek = simple.getDay();
  const ISOweekStart = simple;
  if (dayOfWeek <= 4) {
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  } else {
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  }
  ISOweekStart.setDate(ISOweekStart.getDate() + isoDay - 1);
  return ISOweekStart;
};

Date.prototype.getMillisecondsSinceStartOfDay = function () {
  return (
    this.getHours() * 3600000 +
    this.getMinutes() * 60000 +
    this.getSeconds() * 1000 +
    this.getMilliseconds()
  );
};

Date.prototype.setMillisecondsSinceStartOfDay = function (milliseconds) {
  const date = new Date(this.valueOf());
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds %= 3600000;
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;
  const seconds = Math.floor(milliseconds / 1000);
  const ms = milliseconds % 1000;
  date.setHours(hours, minutes, seconds, ms);
  return date;
};

Date.prototype.getOrdinalSuffix = function () {
  const day = this.getDate();
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

Date.prototype.formatWithOrdinal = function () {
  const day = this.getDate();
  const suffix = this.getOrdinalSuffix();
  return `${day}${suffix}`;
};

Date.prototype.getFiscalYear = function (fiscalYearStartMonth) {
  const month = this.getMonth() + 1;
  const year = this.getFullYear();
  if (month < fiscalYearStartMonth) {
    return year - 1;
  } else {
    return year;
  }
};

Date.prototype.startOfFiscalYear = function (fiscalYearStartMonth) {
  const fiscalYear = this.getFiscalYear(fiscalYearStartMonth);
  return new Date(fiscalYear, fiscalYearStartMonth - 1, 1);
};

Date.prototype.endOfFiscalYear = function (fiscalYearStartMonth) {
  const fiscalYear = this.getFiscalYear(fiscalYearStartMonth);
  return new Date(fiscalYear + 1, fiscalYearStartMonth - 1, 0);
};

Date.prototype.getAge = function (referenceDate) {
  const refDate = referenceDate || new Date();
  let age = refDate.getFullYear() - this.getFullYear();
  const m = refDate.getMonth() - this.getMonth();
  if (m < 0 || (m === 0 && refDate.getDate() < this.getDate())) {
    age--;
  }
  return age;
};

Date.prototype.isSameQuarter = function (otherDate) {
  return (
    this.getFullYear() === otherDate.getFullYear() &&
    this.getQuarter() === otherDate.getQuarter()
  );
};

Date.prototype.addQuarters = function (quarters) {
  return this.addMonths(quarters * 3);
};

Date.prototype.subtractQuarters = function (quarters) {
  return this.subtractMonths(quarters * 3);
};

Date.prototype.getDaysInYear = function () {
  return this.isLeapYear() ? 366 : 365;
};

Date.prototype.getWeekdayName = function () {
  return this.toLocaleDateString("en-US", { weekday: "long" });
};

Date.prototype.getMonthName = function () {
  return this.toLocaleDateString("en-US", { month: "long" });
};

Date.prototype.getShortWeekdayName = function () {
  return this.toLocaleDateString("en-US", { weekday: "short" });
};

Date.prototype.getShortMonthName = function () {
  return this.toLocaleDateString("en-US", { month: "short" });
};

Date.prototype.isSameQuarter = function (otherDate) {
  return (
    this.getFullYear() === otherDate.getFullYear() &&
    this.getQuarter() === otherDate.getQuarter()
  );
};

Date.prototype.addQuarters = function (quarters) {
  return this.addMonths(quarters * 3);
};

Date.prototype.subtractQuarters = function (quarters) {
  return this.subtractMonths(quarters * 3);
};

Date.prototype.getDaysInYear = function () {
  return this.isLeapYear() ? 366 : 365;
};

Date.prototype.getWeekdayName = function () {
  return this.toLocaleDateString("en-US", { weekday: "long" });
};

Date.prototype.getMonthName = function () {
  return this.toLocaleDateString("en-US", { month: "long" });
};

Date.prototype.getShortWeekdayName = function () {
  return this.toLocaleDateString("en-US", { weekday: "short" });
};

Date.prototype.getShortMonthName = function () {
  return this.toLocaleDateString("en-US", { month: "short" });
};

//  bangla  date .js
Date.prototype.toBanglaDateString = function () {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const options = { year: "numeric", month: "long", day: "numeric" };
  let dateString = this.toLocaleDateString("bn-BD", options);
  dateString = dateString.replace(/\d/g, function (digit) {
    return banglaDigits[digit];
  });
  return dateString;
};

Date.prototype.toBanglaMonthName = function () {
  const banglaMonths = [
    "জানুয়ারী",
    "ফেব্রুয়ারী",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return banglaMonths[this.getMonth()];
};

Date.prototype.toBanglaWeekdayName = function () {
  const banglaWeekdays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  return banglaWeekdays[this.getDay()];
};

Date.prototype.toBanglaYear = function () {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const yearString = this.getFullYear().toString();
  let banglaYear = "";
  for (let i = 0; i < yearString.length; i++) {
    banglaYear += banglaDigits[parseInt(yearString[i])];
  }
  return banglaYear;
};

Date.prototype.toBanglaFormattedString = function () {
  const day = this.getDate();
  const monthName = this.toBanglaMonthName();
  const year = this.toBanglaYear();
  return `${day} ${monthName}, ${year}`;
};
