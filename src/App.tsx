import { useState } from "react";
import { MdFavoriteBorder, MdLocalFlorist } from "react-icons/md";
import {
  PeriodForm,
  PeriodCalendar,
  PeriodStats,
  MedicalDetails,
} from "./components";
import type { PeriodData, PeriodCalculations } from "./utils/calculations";
import { calculatePeriodData } from "./utils/calculations";
import "./App.css";

function App() {
  const [calculations, setCalculations] = useState<PeriodCalculations | null>(
    null,
  );
  const [showMedicalDetails, setShowMedicalDetails] = useState(false);

  const handleFormSubmit = (data: PeriodData) => {
    const result = calculatePeriodData(data);
    setCalculations(result);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <MdLocalFlorist style={{ marginRight: "8px", color: "#ff69b4" }} />{" "}
            Period Tracker
          </h1>
          <p>Track your cycle and predict your fertility window</p>
        </div>
      </header>

      <main className="app-main">
        <PeriodForm onSubmit={handleFormSubmit} />

        {calculations && (
          <>
            <PeriodStats
              calculations={calculations}
              onShowMedicalDetails={() => setShowMedicalDetails(true)}
            />
            <PeriodCalendar calculations={calculations} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          <MdFavoriteBorder style={{ marginRight: "8px", color: "#d946a6" }} />
          Created with love for your health awareness
        </p>
      </footer>

      {showMedicalDetails && (
        <MedicalDetails onClose={() => setShowMedicalDetails(false)} />
      )}
    </div>
  );
}

export default App;
