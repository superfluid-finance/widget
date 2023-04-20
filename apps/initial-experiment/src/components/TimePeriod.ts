export const timePeriods = ["week", "month", "year"] as const;

export const mapTimePeriodToSeconds = (timePeriod: TimePeriod) => {
  switch (timePeriod) {
    case "week":
      return 604800; // 60 * 60 * 24 * 7 seconds in a week
    case "month":
      return 2592000; // 60 * 60 * 24 * 30 seconds in a month (approximation)
    case "year":
      return 31536000; // 60 * 60 * 24 * 365 seconds in a year (approximation)
    default:
      throw new Error(`Invalid time period: ${timePeriod}`);
  }
};

type TimePeriod = (typeof timePeriods)[number];

export default TimePeriod;