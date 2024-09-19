import { useState } from "react";
import "./App.css";
import { NOOB, UPI_HANDLERS } from "./utils/constants";

function App() {
  const [upiID, setUpiID] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiID(value);
    if (!value.includes("@")) {
      setPrediction(value || "");
      return;
    }

    const [userName, bankName] = value.split("@");
    if (!userName) {
      return;
    }
    const findBankNameRegex = new RegExp(`${bankName}`);
    const filtedBankName = UPI_HANDLERS.filter((val) =>
      findBankNameRegex.test(val),
    );
    let predictedVal = filtedBankName[0];
    if (!filtedBankName.length) {
      predictedVal = "";
    }
    setPrediction(`${userName}@${predictedVal}`);
  };

  const handleKeyDown = (e) => {
    const { keyCode, key } = e;
    const isRightArrow = key.toLowerCase() === "arrowright" || keyCode === 39;
    if (isRightArrow) {
      setUpiID(prediction);
    }
  };
  return (
    <>
      <h1>UPI name Autocomplete</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <input type="text" value={prediction} onChange={NOOB} />
        <input
          type="text"
          value={upiID}
          onChange={handleUpiChange}
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
          onKeyDown={handleKeyDown}
          placeholder="Enter your UPI ID"
        />
      </div>
    </>
  );
}

export default App;
