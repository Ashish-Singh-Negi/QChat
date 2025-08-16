const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
// const ONE_WEEK = ONE_DAY * 7;

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getMessageDate = (messageTime: string) => {
  const time = new Date(messageTime ?? "");

  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const year = time.getFullYear();

  const isDay = parseDateToDay(time);
  if (isDay) return isDay;

  return `${day}-${month}-${year}`;
};

const parseDateToDay = (messageDate: Date): string | undefined => {
  const now = new Date();

  const messageYear = messageDate.getFullYear();
  const messageMonth = messageDate.getMonth();
  const messageDay = messageDate.getDate();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const messageDateOnly = new Date(
    messageYear,
    messageMonth,
    messageDay
  ).getTime();
  const currentDateOnly = new Date(
    currentYear,
    currentMonth,
    currentDay
  ).getTime();
  console.log("🚀 ~ parseDateToDay ~ messageDateOnly:", messageDateOnly);
  console.log("🚀 ~ parseDateToDay ~ currentDateOnly:", currentDateOnly);

  const dayDifference = Math.floor(
    (currentDateOnly - messageDateOnly) / ONE_DAY
  );
  console.log("🚀 ~ parseDateToDay ~ dayDifference:", dayDifference);

  if (dayDifference === 0) return "Today";
  if (dayDifference === 1) return "Yesterday";
  if (dayDifference < 7) return DAYS[messageDate.getDay()];

  return undefined;
};
