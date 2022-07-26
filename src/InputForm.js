import React, { useState, useEffect } from "react";
import axios from "axios";

import "./form.styles.css";

const BKPLUrl =
  "https://docs.google.com/spreadsheets/d/1ry0wKFkCXMQg5bY_oSezOahIOuc6Koam0o6taDM86Vg/edit#gid=0";
const BPCLUrl =
  "https://docs.google.com/spreadsheets/d/1T-7hgOPGrDUjiFUOPGYn8xsrED7sLfpjqdtN0roWdao/edit#gid=0";

const InputForm = () => {
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [psp, setPSP] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getDateAndTime();
    getLocationAndType();
  }, []);

  // Function to get date and time
  const getDateAndTime = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    const hour = String(today.getHours());
    const minutes = String(today.getMinutes());

    setDate(`${year}-${month}-${day}`);
    setTime(`${hour}:${minutes}`);
  };

  // Function to get location and type
  const getLocationAndType = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);

    const location = url.searchParams.get("location");
    const type = url.searchParams.get("type");

    setLocation(location);
    setType(type);
  };

  const formHandler = (e) => {
    e.preventDefault();

    const timeStamp = new Date().toLocaleString("en-GB");

    const body = {
      date,
      time,
      psp,
      current,
      voltage,
      location,
      timeStamp,
    };

    if (type === "BKPL") {
      axios
        .post(BKPLUrl, body)
        .then((response) => {
          setSuccess(true);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(BPCLUrl, body)
        .then((response) => {
          setSuccess(true);
        })
        .catch((error) => console.log(error));
    }
  };

  // Function to reset all values
  const resetValues = () => {
    getDateAndTime();
    setPSP("");
    setCurrent("");
    setVoltage("");
    getLocationAndType();
    setSuccess(false);
  };

  return (
    <div className="form-container">
      {!success && (
        <form className="form-body" onSubmit={(e) => formHandler(e)}>
          <label className="form-label">
            Date :
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="form-label">
            Time :
            <input
              className="form-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <label className="form-label">
            PSP :
            <input
              className="form-input"
              type="number"
              step=".01"
              value={psp}
              onChange={(e) => setPSP(e.target.value)}
            />
          </label>

          <label className="form-label">
            Current (Am) :
            <input
              className="form-input"
              type="number"
              step=".01"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </label>

          <label className="form-label">
            Voltage :
            <input
              className="form-input"
              type="number"
              step=".01"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
            />
          </label>

          <input className="form-button" type="submit" value="Submit" />
        </form>
      )}

      {success && (
        <div className="success-msg-container">
          <p>The entry has been registered successfully.</p>
          <button className="success-button" onClick={() => resetValues()}>
            New Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
