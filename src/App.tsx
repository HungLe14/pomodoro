import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [minute, setMinute] = useState<number>(1);
  const [second, setSecond] = useState<number>(15);
  const [count, setCount] = useState<boolean>(false);

  const showTime = (type: number) => {
    if (type <= 9) {
      return "0" + type;
    }
    return type;
  };

  const onStartHandler = () => {
    setCount(true);
  };

  const onStopHandler = () => {
    setCount(false);
  };

  const onResetHandler = () => {
    setCount(false);
    setSecond(15);
    setMinute(1);
  };

  useEffect(() => {
    const coundown = setInterval(() => {
      if (count) {
        setSecond((preSecond) => preSecond - 1);
        if (second === 0) {
          setMinute((preMinute) => preMinute - 1);
          setSecond(59);
        }
      }
    }, 1000);
    if (second === 0 && minute === 0) {
      clearInterval(coundown);
      alert(`Time's up!`);
    }
    return () => clearInterval(coundown);
  }, [second, minute, count]);

  return (
    <div className="app">
      <h2>Pomodoro!</h2>

      <div className="timer">
        <span>{showTime(minute)}</span>
        <span>:</span>
        <span>{showTime(second)}</span>
      </div>

      <div className="buttons">
        <button onClick={onStartHandler}>Start</button>
        <button onClick={onStopHandler}>Stop</button>
        <button onClick={onResetHandler}>Reset</button>
      </div>
    </div>
  );
}
