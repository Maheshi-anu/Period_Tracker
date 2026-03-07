import {
  MdBarChart,
  MdEgg,
  MdFavorite,
  MdStar,
  MdLightbulb,
  MdMenuBook,
  MdWaterDrop,
  MdNotificationsNone,
} from "react-icons/md";
import type { PeriodCalculations } from "../utils/calculations";
import {
  formatDate,
  formatDateShort,
  isCurrentlyOnPeriod,
  getPeriodDayNumber,
  getDaysUntilNextPeriod,
} from "../utils/calculations";
import styles from "./PeriodStats.module.css";

interface PeriodStatsProps {
  calculations: PeriodCalculations;
  onShowMedicalDetails?: () => void;
}

export function PeriodStats({
  calculations,
  onShowMedicalDetails,
}: PeriodStatsProps) {
  const onPeriod = isCurrentlyOnPeriod(calculations);
  const periodDayNumber = getPeriodDayNumber(calculations);
  const daysUntilPeriod = getDaysUntilNextPeriod(calculations);

  return (
    <div className={styles.statsContainer}>
      <h2>
        <MdBarChart style={{ marginRight: "8px", color: "#d946a6" }} /> Your
        Cycle Information
      </h2>

      {onPeriod ? (
        <div className={styles.currentPeriodCard}>
          <div className={styles.periodStatusCard}>
            <div className={styles.periodIcon}>
              <MdWaterDrop size={56} color="#d946a6" />
            </div>
            <div className={styles.periodContent}>
              <h3>Day {periodDayNumber} of Your Period</h3>
              <div className={styles.instructions}>
                <p>💧 Drink plenty of water</p>
                <p>😴 Get enough rest</p>
                <p>🍎 Eat nutritious foods</p>
                <p>🧘 Take care of yourself</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.currentPeriodCard}>
          <div
            className={styles.periodStatusCard + " " + styles.nextPeriodCard}
          >
            <div className={styles.periodIcon}>
              <MdNotificationsNone size={56} color="#7c3aed" />
            </div>
            <div className={styles.periodContent}>
              <h3>Next Period In {daysUntilPeriod} Days</h3>
              <p className={styles.nextPeriodDate}>
                {formatDate(calculations.nextPeriodStart)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={styles.statCard + " " + styles.ovulationCard}>
          <div className={styles.statIcon} style={{ color: "#ff9a33" }}>
            <MdEgg size={48} />
          </div>
          <div className={styles.statContent}>
            <h3>Ovulation Day</h3>
            <p className={styles.date}>
              {formatDate(calculations.ovulationDate)}
            </p>
            <p className={styles.details}>
              {formatDateShort(calculations.ovulationDate)}
            </p>
          </div>
        </div>

        <div className={styles.statCard + " " + styles.fertileCard}>
          <div className={styles.statIcon} style={{ color: "#14b8a6" }}>
            <MdFavorite size={48} />
          </div>
          <div className={styles.statContent}>
            <h3>Fertile Window</h3>
            <p className={styles.date}>
              {calculations.fertileWindowStart.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {calculations.fertileWindowEnd.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className={styles.details}>~6 days of high fertility</p>
          </div>
        </div>

        <div className={styles.statCard + " " + styles.pregnancyCard}>
          <div className={styles.statIcon} style={{ color: "#a855f7" }}>
            <MdStar size={48} />
          </div>
          <div className={styles.statContent}>
            <h3>Pregnancy Chance</h3>
            <p className={styles.date}>
              {calculations.pregnancyChanceWindow.start.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                },
              )}{" "}
              -{" "}
              {calculations.pregnancyChanceWindow.end.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                },
              )}
            </p>
            <p className={styles.details}>Peak fertility period</p>
          </div>
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p className={styles.disclaimerTitle}>
          <MdLightbulb style={{ marginRight: "8px", color: "#a855f7" }} />{" "}
          Important Note
        </p>
        <p className={styles.disclaimerText}>
          These predictions are estimates based on typical cycle patterns. Every
          person is unique, and cycle lengths can vary. This app is for tracking
          purposes only and is not a substitute for contraception or medical
          advice. For more accurate predictions, consider consulting with a
          healthcare provider.
        </p>
        {onShowMedicalDetails && (
          <button
            className={styles.moreDetailsButton}
            onClick={onShowMedicalDetails}
          >
            <MdMenuBook style={{ marginRight: "8px" }} /> Learn More About
            Medical Accuracy
          </button>
        )}
      </div>
    </div>
  );
}
