import { useState } from "react";
import { PeriodForm, PeriodCalendar, PeriodStats } from "./components";
import type { PeriodData, PeriodCalculations } from "./utils/calculations";
import { calculatePeriodData } from "./utils/calculations";
import "./App.css";

function App() {
  const [calculations, setCalculations] = useState<PeriodCalculations | null>(
    null,
  );

  const handleFormSubmit = (data: PeriodData) => {
    const result = calculatePeriodData(data);
    setCalculations(result);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🌸 Period Tracker</h1>
          <p>Track your cycle and predict your fertility window</p>
        </div>
      </header>

      <main className="app-main">
        <PeriodForm onSubmit={handleFormSubmit} />

        {calculations && (
          <>
            <PeriodStats calculations={calculations} />
            <PeriodCalendar calculations={calculations} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>💚 Created with love for your health awareness</p>
      </footer>
    </div>
  );
}

export default App;
