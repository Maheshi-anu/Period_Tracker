import {
  MdClose,
  MdStar,
  MdInfoOutline,
  MdSearch,
  MdElectricBolt,
} from "react-icons/md";
import styles from "./MedicalDetails.module.css";

interface MedicalDetailsProps {
  onClose: () => void;
}

export function MedicalDetails({ onClose }: MedicalDetailsProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.detailsContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <MdClose size={24} style={{ color: "#7c3aed" }} />
        </button>

        <h2 className={styles.mainTitle}>
          <MdStar style={{ marginRight: "8px", color: "#a855f7" }} /> How This
          App Works
        </h2>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MdInfoOutline style={{ marginRight: "8px", color: "#d946a6" }} />{" "}
            What Does This App Do?
          </h3>

          <div className={styles.card}>
            <h4>Predicts Your Cycle</h4>
            <p>
              This app helps you understand your menstrual cycle by predicting
              when your next period will come and identifies important dates in
              your cycle. It uses the dates you provide to make these
              predictions.
            </p>
          </div>

          <div className={styles.card}>
            <h4>Tracks Key Dates</h4>
            <p>
              The app shows you when you're likely to ovulate (release an egg),
              when you're most fertile, and when your next period should arrive.
              This helps you understand your body better.
            </p>
          </div>

          <div className={styles.card}>
            <h4>Color-Coded Calendar</h4>
            <p>
              Different colors on the calendar show different phases: period
              days, ovulation, fertile window, and peak pregnancy chance days.
              This makes it easy to see your cycle at a glance.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MdSearch style={{ marginRight: "8px", color: "#ff9a33" }} /> How
            Does It Calculate?
          </h3>

          <div className={styles.card}>
            <h4>Your Cycle Length</h4>
            <p>
              You enter how many days your cycle lasts (usually 21-35 days). The
              app uses this to predict when your next period will start.
            </p>
          </div>

          <div className={styles.card}>
            <h4>Ovulation Timing</h4>
            <p>
              The app estimates that you ovulate around day 14 of your cycle
              (the middle point). Most people ovulate roughly 14 days before
              their next period starts.
            </p>
          </div>

          <div className={styles.card}>
            <h4>Fertile Days</h4>
            <p>
              The fertile window includes 5 days before ovulation and 1 day
              after. This is when pregnancy is most likely to occur if you've
              had unprotected sex.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MdElectricBolt style={{ marginRight: "8px", color: "#14b8a6" }} />{" "}
            Important Things to Know Know
          </h3>

          <div className={styles.card}>
            <h4>Everyone's Different</h4>
            <p>
              Your cycle might not be exactly the same every month. Cycles can
              shift by a few days due to stress, exercise, illness, or hormonal
              changes. This app assumes a regular pattern, but your body might
              not always follow it perfectly.
            </p>
          </div>

          <div className={styles.card}>
            <h4>Not All Bodies Are the Same</h4>
            <p>
              Some people have naturally shorter or longer cycles. Some people
              have irregular cycles due to conditions like PCOS or other
              hormonal factors. This app works best for people with fairly
              regular cycles.
            </p>
          </div>

          <div className={styles.card}>
            <h4>Not 100% Accurate</h4>
            <p>
              These predictions are estimates based on typical patterns. They're
              helpful for planning and self-awareness, but they're not perfect.
              If you need more precision, talk to a doctor or healthcare
              provider.
            </p>
          </div>

          <div className={styles.card}>
            <h4>For Information Only</h4>
            <p>
              This app should NOT be used as your only method of contraception.
              It's a tracking tool for awareness and planning. For birth
              control, use proven methods like condoms, birth control pills, or
              other contraceptives. Always talk to a healthcare provider about
              the best options for you.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MdStar style={{ marginRight: "8px", color: "#c084fc" }} /> Best Way
            to Use This App
          </h3>
          <div className={styles.card}>
            <ul className={styles.list}>
              <li>
                Track your period for a few months to see your actual pattern
              </li>
              <li>Use it to plan activities based on how you usually feel</li>
              <li>Stay aware of your body and its natural rhythms</li>
              <li>Talk to a doctor if your cycle changes significantly</li>
              <li>Remember it's a guide, not medical advice</li>
            </ul>
          </div>
        </div>

        <button className={styles.closeModalButton} onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}
