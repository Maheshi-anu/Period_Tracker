import { useState } from "react";
import type { PeriodCalculations } from "../utils/calculations";
import {
  getCalendarDays,
  formatDate,
} from "../utils/calculations";
import styles from "./PeriodCalendar.module.css";

interface PeriodCalendarProps {
  calculations: PeriodCalculations;
}

export function PeriodCalendar({ calculations }: PeriodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInCalendar = getCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    calculations,
  );

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button onClick={handlePrevMonth} className={styles.navButton}>
          ←
        </button>
        <h3>{monthYear}</h3>
        <button onClick={handleNextMonth} className={styles.navButton}>
          →
        </button>
      </div>

      <div className={styles.weekDays}>
        {weekDays.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {daysInCalendar.map((dayStatus, index) => (
          <div
            key={index}
            className={`${styles.day} ${!dayStatus.isCurrentMonth ? styles.otherMonth : ""} ${
              dayStatus.isPeriodDay ? styles.periodDay : ""
            } ${dayStatus.isOvulationDay ? styles.ovulationDay : ""} ${
              dayStatus.isFertileWindow ? styles.fertileWindow : ""
            } ${dayStatus.isPregnancyChanceWindow ? styles.pregnancyChance : ""}`}
            title={getDayTooltip(dayStatus)}
          >
            <span className={styles.dayNumber}>{dayStatus.day}</span>
            {dayStatus.isOvulationDay && (
              <span className={styles.badge}>🥚</span>
            )}
            {dayStatus.isPeriodDay && <span className={styles.badge}>🩸</span>}
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.periodDay}`}></div>
          <span>Period Days</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.ovulationDay}`}></div>
          <span>Ovulation</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.fertileWindow}`}></div>
          <span>Fertile Window</span>
        </div>
        <div className={styles.legendItem}>
          <div
            className={`${styles.legendBox} ${styles.pregnancyChance}`}
          ></div>
          <span>Pregnancy Chance</span>
        </div>
      </div>
    </div>
  );
}

interface DayStatus {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isPeriodDay: boolean;
  isOvulationDay: boolean;
  isFertileWindow: boolean;
  isPregnancyChanceWindow: boolean;
}

function getDayTooltip(dayStatus: DayStatus): string {
  const parts: string[] = [];

  if (dayStatus.isPeriodDay) {
    parts.push("Period Day");
  }
  if (dayStatus.isOvulationDay) {
    parts.push("Ovulation Day");
  }
  if (dayStatus.isFertileWindow) {
    parts.push("Fertile Window");
  }
  if (dayStatus.isPregnancyChanceWindow) {
    parts.push("High Pregnancy Chance");
  }

  return parts.length > 0 ? parts.join(" • ") : formatDate(dayStatus.date);
}
