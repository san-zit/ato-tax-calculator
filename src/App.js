import "./App.css";
import React, { useState } from "react";
import { taxRates } from "./taxRates"; // Import the taxRates

function App() {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState(0);
  const [incomeYear, setIncomeYear] = useState("2022-2023");

  const incomeYears = Object.keys(taxRates);

  const calculateTax = () => {
    const taxableIncome = parseFloat(income);

    if (isNaN(taxableIncome) || taxableIncome < 0) {
      alert("Please enter a valid income.");
      return;
    }

    const rates = taxRates[incomeYear];
    let calculatedTax = 0;

    for (const bracket of rates) {
      if (taxableIncome > bracket.min && taxableIncome <= bracket.max) {
        calculatedTax =
          bracket.base + (taxableIncome - bracket.min) * bracket.rate;
        break;
      }
    }

    setTax(calculatedTax.toFixed(2));
  };

  return (
    <div className="App">
      <h1>ATO Tax Calculator</h1>
      <div className="calculator">
        <label htmlFor="income-year">Select Income Year:</label>
        <select
          id="income-year"
          value={incomeYear}
          onChange={(e) => setIncomeYear(e.target.value)}
        >
          {incomeYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="income">Enter your taxable income:</label>
        <input
          type="number"
          id="income"
          placeholder="Enter amount in AUD"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <button onClick={calculateTax}>Calculate Tax</button>
        <h2>Your estimated tax is: ${tax}</h2>
      </div>
      <div className="disclaimer">
        <h3>Disclaimer</h3>
        <p>
          The tax rates and calculations in this application are based on
          publicly available data from the Australian Taxation Office (ATO).
          However, please be aware that any changes to the tax rates or
          regulations made by the ATO may take some time to be reflected in this
          app.
        </p>
        <p>
          For accurate and up-to-date income tax predictions, it is always
          advisable to consult with a registered tax agent or financial
          professional.
        </p>
      </div>
      
    </div>
  );
}

export default App;
