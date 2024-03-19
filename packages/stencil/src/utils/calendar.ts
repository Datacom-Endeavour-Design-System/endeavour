export class Calendar {
  readonly year: number;
  readonly month: number;

  private daysOfPrevMonthCount = 0;
  private daysOfNextMonthCount = 0;

  public daysInCalendar = 0;

  constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
  }

  public getCalendarDays(): number[] {
    const daysOfCurrentMonth = this.getDaysOfCurrentMonth();
    const daysOfPrevMonth = this.getDaysOfPrevMonth();
    const daysOfNextMonth = this.geDaysOfNextMonth();

    this.daysOfPrevMonthCount = daysOfPrevMonth.length;
    this.daysOfNextMonthCount = daysOfNextMonth.length;
    this.daysInCalendar =
      daysOfPrevMonth.length +
      daysOfCurrentMonth.length +
      daysOfNextMonth.length;

    return daysOfPrevMonth.concat(daysOfCurrentMonth).concat(daysOfNextMonth);
  }

  private getDaysOfCurrentMonth(): number[] {
    const daysOfMonth = new Date(this.year, this.month + 1, 0);
    return Array.from({ length: daysOfMonth.getDate() }, (_, i) => i + 1);
  }

  private getDaysOfPrevMonth(): number[] {
    const daysOfMonth = new Date(this.year, this.month, 0);
    const days: number[] = [];
    // i = 1 [Monday]
    for (let i = 1; i <= daysOfMonth.getDay(); i++) {
      days.push(daysOfMonth.getDate() - daysOfMonth.getDay() + i);
    }
    return days;
  }

  private geDaysOfNextMonth(): number[] {
    const daysOfMonth = new Date(this.year, this.month + 1, 1);
    const days: number[] = [];
    // return empty array if 1st day of next month falls to Monday
    if (daysOfMonth.getDay() == 1) {
      return days;
    }
    // return [1] if 1st day of next month falls to Sunday
    if (daysOfMonth.getDay() == 0) {
      return [1];
    }
    // 7 days of the week
    for (let i = daysOfMonth.getDay(); i <= 7; i++) {
      days.push(daysOfMonth.getDate() - daysOfMonth.getDay() + i);
    }
    return days;
  }

  public getDaysOfPrevMonthCount(): number {
    return this.daysOfPrevMonthCount;
  }

  public getDaysOfNextMonthCount(): number {
    return this.daysOfNextMonthCount;
  }
}
