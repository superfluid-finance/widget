export const timePeriods = ["day", "week", "month", "year"] as const;

export const mapTimePeriodToSeconds = (timePeriod: TimePeriod): bigint => {
  switch (timePeriod) {
    case "day":
      return 86400n; // 60 * 60 * 24 seconds in a day
    case "week":
      return 604800n; // 60 * 60 * 24 * 7 seconds in a week
    case "month":
      return 2628000n; // 60 * 60 * 24 * 30 seconds in a month (approximation)
    case "year":
      return 31536000n; // 60 * 60 * 24 * 365 seconds in a year (approximation)
    default:
      throw new Error(`Invalid time period: ${timePeriod}`);
  }
};

export type TimePeriod = (typeof timePeriods)[number];
