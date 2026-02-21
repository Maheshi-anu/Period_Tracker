import { useState } from "react";
import type { PeriodData } from "../utils/calculations";
import styles from "./PeriodForm.module.css";

interface PeriodFormProps {
  onSubmit: (data: PeriodData) => void;
}

export function PeriodForm({ onSubmit }: PeriodFormProps) {
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [lastPeriodStart, setLastPeriodStart] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !lastPeriodStart ||
      cycleLength < 21 ||
      cycleLength > 35 ||
      periodLength < 3 ||
      periodLength > 7
    ) {
      alert("Please enter valid values");
      return;
    }

    onSubmit({
      cycleLength,
      periodLength,
      lastPeriodStart: new Date(lastPeriodStart),
    });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>💕 Period Tracker</h2>
        <p>Enter your cycle information to get predictions</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="cycleLength">
            <span className={styles.icon}>📅</span>
            Average Cycle Length (days)
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="cycleLength"
              type="number"
              min="21"
              max="35"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className={styles.input}
            />
            <span className={styles.hint}>Typical: 21-35 days</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="periodLength">
            <span className={styles.icon}>🩸</span>
            Average Period Length (days)
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="periodLength"
              type="number"
              min="3"
              max="7"
              value={periodLength}
              onChange={(e) => setPeriodLength(Number(e.target.value))}
              className={styles.input}
            />
            <span className={styles.hint}>Typical: 3-7 days</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastPeriodStart">
            <span className={styles.icon}>📍</span>
            Last Period Start Date
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="lastPeriodStart"
              type="date"
              value={lastPeriodStart}
              onChange={(e) => setLastPeriodStart(e.target.value)}
              className={styles.input}
            />
            <span className={styles.hint}>
              When did your last period start?
            </span>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          ✨ Calculate & Track
        </button>
      </form>

      <div className={styles.info}>
        <p className={styles.infoTitle}>📚 Did you know?</p>
        <p className={styles.infoText}>
          A typical menstrual cycle is 28 days, but it can range from 21 to 35
          days. Every person is different!
        </p>
      </div>
    </div>
  );
}
