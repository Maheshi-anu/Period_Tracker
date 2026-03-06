import { useState } from "react";
import {
  MdFavorite,
  MdWaterDrop,
  MdLocalFlorist,
  MdAutoAwesome,
  MdSpa,
} from "react-icons/md";
import type { PeriodCalculations } from "../utils/calculations";
import {
  getCalendarDays,
  formatDate,
  getPreviousMonthsPeriodDates,
} from "../utils/calculations";
import styles from "./PeriodCalendar.module.css";

interface PeriodCalendarProps {
  calculations: PeriodCalculations;
}

export function PeriodCalendar({ calculations }: PeriodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayStatus | null>(null);
  const previousPeriodDates = getPreviousMonthsPeriodDates(calculations, 6);

  const daysInCalendar = getCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    calculations,
  );

  const isPreviousPeriodDate = (date: Date): boolean => {
    return previousPeriodDates.some(
      (prevDate) =>
        prevDate.getFullYear() === date.getFullYear() &&
        prevDate.getMonth() === date.getMonth() &&
        prevDate.getDate() === date.getDate(),
    );
  };

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
        {daysInCalendar.map((dayStatus, index) => {
          const isPrevPeriod = isPreviousPeriodDate(dayStatus.date);
          return (
            <div
              key={index}
              className={`${styles.day} ${!dayStatus.isCurrentMonth ? styles.otherMonth : ""} ${
                isPrevPeriod ? styles.previousPeriodDay : ""
              } ${dayStatus.isPeriodDay && !isPrevPeriod ? styles.periodDay : ""} ${
                dayStatus.isOvulationDay ? styles.ovulationDay : ""
              } ${dayStatus.isFertileWindow && !isPrevPeriod ? styles.fertileWindow : ""} ${
                dayStatus.isPregnancyChanceWindow && !isPrevPeriod
                  ? styles.pregnancyChance
                  : ""
              }`}
              title={getDayTooltip(dayStatus)}
              onClick={() =>
                dayStatus.isCurrentMonth && setSelectedDay(dayStatus)
              }
            >
              <span className={styles.dayNumber}>{dayStatus.day}</span>
              {dayStatus.isOvulationDay && !isPrevPeriod && (
                <MdFavorite
                  style={{ color: "#ff9a33", fontSize: "0.8rem" }}
                  className={styles.badge}
                />
              )}
              {(dayStatus.isPeriodDay || isPrevPeriod) && (
                <MdWaterDrop
                  style={{
                    color: isPrevPeriod ? "#dc2626" : "#e63946",
                    fontSize: "0.8rem",
                  }}
                  className={styles.badge}
                />
              )}
            </div>
          );
        })}
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

      {selectedDay && (
        <div
          className={styles.popupOverlay}
          onClick={() => setSelectedDay(null)}
        >
          <div
            className={`${styles.popup} ${
              selectedDay.isPeriodDay
                ? styles.popupPeriod
                : selectedDay.isOvulationDay
                  ? styles.popupOvulation
                  : selectedDay.isFertileWindow
                    ? styles.popupFertile
                    : selectedDay.isPregnancyChanceWindow
                      ? styles.popupPregnancy
                      : styles.popupNormal
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedDay(null)}
            >
              ✕
            </button>
            <div className={styles.popupIcon}>{getPopupIcon(selectedDay)}</div>
            <div className={styles.popupDate}>
              {formatDate(selectedDay.date)}
            </div>
            <div className={styles.popupMessage}>
              {getPopupMessage(selectedDay)}
            </div>
          </div>
        </div>
      )}
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

function getPopupMessage(dayStatus: DayStatus): string {
  if (dayStatus.isPeriodDay && dayStatus.isOvulationDay) {
    return "This day overlaps with your ovulation period. Monitor for any changes in your cycle.";
  }

  if (dayStatus.isPeriodDay) {
    return "Your menstrual period. Remember to take care of yourself and stay hydrated.";
  }

  if (dayStatus.isOvulationDay) {
    return "Ovulation Day - Your most fertile day! An egg has been released from your ovary.";
  }

  if (dayStatus.isFertileWindow && dayStatus.isPregnancyChanceWindow) {
    return "Peak Fertility Window - Highest chance of conception. Plan accordingly!";
  }

  if (dayStatus.isFertileWindow) {
    return "Fertile Window - You have a moderate chance of conception during this period.";
  }

  if (dayStatus.isPregnancyChanceWindow) {
    return "Pregnancy Chance Window - Increased likelihood of conception.";
  }

  return "Regular day - No significant cycle events on this date.";
}

function getPopupIcon(dayStatus: DayStatus) {
  const iconProps = {
    size: 48,
    style: { marginBottom: "0.5rem" },
  };

  if (dayStatus.isPeriodDay) {
    return <MdWaterDrop {...iconProps} color="#d946a6" />;
  }
  if (dayStatus.isOvulationDay) {
    return <MdFavorite {...iconProps} color="#ff9a33" />;
  }
  if (dayStatus.isFertileWindow) {
    return <MdLocalFlorist {...iconProps} color="#14b8a6" />;
  }
  if (dayStatus.isPregnancyChanceWindow) {
    return <MdAutoAwesome {...iconProps} color="#a855f7" />;
  }
  return <MdSpa {...iconProps} color="#7c3aed" />;
}
