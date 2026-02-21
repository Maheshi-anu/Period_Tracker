import type { PeriodCalculations } from "../utils/calculations";
import { formatDate, formatDateShort } from "../utils/calculations";
import styles from "./PeriodStats.module.css";

interface PeriodStatsProps {
  calculations: PeriodCalculations;
}

export function PeriodStats({ calculations }: PeriodStatsProps) {
  return (
    <div className={styles.statsContainer}>
      <h2>📊 Your Cycle Information</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard + " " + styles.periodCard}>
          <div className={styles.statIcon}>🩸</div>
          <div className={styles.statContent}>
            <h3>Next Period</h3>
            <p className={styles.date}>
              {formatDate(calculations.nextPeriodStart)}
            </p>
            <p className={styles.details}>
              {formatDateShort(calculations.nextPeriodStart)} -{" "}
              {formatDateShort(calculations.nextPeriodEnd)}
            </p>
          </div>
        </div>

        <div className={styles.statCard + " " + styles.ovulationCard}>
          <div className={styles.statIcon}>🥚</div>
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
          <div className={styles.statIcon}>💚</div>
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
          <div className={styles.statIcon}>✨</div>
          <div className={styles.statContent}>
            <h3>Pregnancy Chance Window</h3>
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
        <p className={styles.disclaimerTitle}>💡 Important Note</p>
        <p className={styles.disclaimerText}>
          These predictions are estimates based on typical cycle patterns. Every
          person is unique, and cycle lengths can vary. This app is for tracking
          purposes only and is not a substitute for contraception or medical
          advice. For more accurate predictions, consider consulting with a
          healthcare provider.
        </p>
      </div>
    </div>
  );
}
