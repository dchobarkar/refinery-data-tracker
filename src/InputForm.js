import React, { useState, useEffect } from "react";

const InputForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [psp, setPSP] = useState("");
  const [current, setCurrent] = useState("");
  const [location, setLocation] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  useEffect(() => {
    getDateAndTime();
    getLocation();
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

  // Function to get location
  const getLocation = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);

    const location = url.searchParams.get("location");

    setLocation(location);
  };

  // Function to get current timestamp
  const getTimeStamp = () => {
    setTimeStamp(new Date().toLocaleString("en-GB"));
  };

  const formHandler = (e) => {
    e.preventDefault();

    getTimeStamp();

    console.log(date);
    console.log(time);
    console.log(psp);
    console.log(current);
    console.log(location);
    console.log(timeStamp);
  };

  return (
    <div>
      <form onSubmit={(e) => formHandler(e)}>
        <label>
          Date :
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Time :
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label>
          PSP :
          <input
            type="number"
            step=".01"
            value={psp}
            onChange={(e) => setPSP(e.target.value)}
          />
        </label>

        <label>
          Current (Am) :
          <input
            type="number"
            step=".01"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default InputForm;
