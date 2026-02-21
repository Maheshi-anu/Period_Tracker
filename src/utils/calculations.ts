/**
 * Period tracking calculations
 */

export interface PeriodData {
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: Date;
}

export interface PeriodCalculations {
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  pregnancyChanceWindow: {
    start: Date;
    end: Date;
  };
}

/**
 * Calculate period-related dates
 * Standard menstrual cycle: ovulation occurs ~14 days before next period
 */
export function calculatePeriodData(data: PeriodData): PeriodCalculations {
  const { cycleLength, periodLength, lastPeriodStart } = data;

  // Next period starts after the cycle length
  const nextPeriodStart = new Date(lastPeriodStart);
  nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);

  // Next period ends after the period length
  const nextPeriodEnd = new Date(nextPeriodStart);
  nextPeriodEnd.setDate(nextPeriodEnd.getDate() + periodLength);

  // Ovulation typically occurs around day 14 of the cycle (middle of cycle)
  // More precisely: 14 days before the next period
  const ovulationDate = new Date(nextPeriodStart);
  ovulationDate.setDate(ovulationDate.getDate() - 14);

  // Fertile window: typically 5 days before ovulation to 1 day after
  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

  // Pregnancy chance window: highest 5 days before ovulation to ovulation day
  const pregnancyChanceWindow = {
    start: new Date(ovulationDate),
    end: new Date(ovulationDate),
  };
  pregnancyChanceWindow.start.setDate(pregnancyChanceWindow.start.getDate() - 5);

  return {
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    pregnancyChanceWindow,
  };
}

/**
 * Get all dates in a calendar month with their period statuses
 */
export interface DateStatus {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isPeriodDay: boolean;
  isOvulationDay: boolean;
  isFertileWindow: boolean;
  isPregnancyChanceWindow: boolean;
}

export function getCalendarDays(
  year: number,
  month: number,
  calculations: PeriodCalculations
): DateStatus[] {
  const days: DateStatus[] = [];

  // Get first day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  // Generate 42 days (6 weeks) to fill calendar grid
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Check if date is in current month
    const isCurrentMonth = date.getMonth() === month;

    // Check various period-related statuses
    const isPeriodDay = isDateInRange(date, calculations.nextPeriodStart, calculations.nextPeriodEnd);
    const isOvulationDay = isSameDay(date, calculations.ovulationDate);
    const isFertileWindow = isDateInRange(
      date,
      calculations.fertileWindowStart,
      calculations.fertileWindowEnd
    );
    const isPregnancyChanceWindow = isDateInRange(
      date,
      calculations.pregnancyChanceWindow.start,
      calculations.pregnancyChanceWindow.end
    );

    days.push({
      date: new Date(date),
      day: date.getDate(),
      isCurrentMonth,
      isPeriodDay,
      isOvulationDay,
      isFertileWindow,
      isPregnancyChanceWindow,
    });
  }

  return days;
}

/**
 * Helper: Check if a date is within a range
 */
function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(0, 0, 0, 0);
  return d >= s && d <= e;
}

/**
 * Helper: Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date to short string (MM/DD/YYYY)
 */
export function formatDateShort(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
