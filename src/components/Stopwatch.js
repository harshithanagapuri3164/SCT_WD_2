import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./Stopwatch.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (time > 0) setLaps([...laps, time]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="app-container">
      <div className="stopwatch-card">
        <div className="stopwatch-content">
          {/* Timer Display */}
          <motion.div
            className="time-display"
            animate={{ scale: isRunning ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatTime(time)}
          </motion.div>

          {/* Controls */}
          <div className="controls">
            <button onClick={start} disabled={isRunning} className="btn start">
              Start
            </button>
            <button onClick={pause} disabled={!isRunning} className="btn pause">
              Pause
            </button>
            <button onClick={reset} className="btn reset">
              Reset
            </button>
            <button onClick={addLap} disabled={!isRunning} className="btn lap">
              Lap
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="toggle-dark-mode">
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Lap Times */}
          <div className="laps-container">
            {laps.length > 0 && (
              <ul className="laps-list">
                {laps.map((lap, index) => (
                  <li key={index} className="lap-item">
                    <span className="lap-label">Lap {index + 1}: </span>
                    {formatTime(lap)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
