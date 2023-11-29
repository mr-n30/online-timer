import { useState, useEffect } from 'react'

// Minute in milliseconds
const MINMIL = 60000;

export default function App() {
  // state
  const [stop, setStop] = useState(true);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * MINMIL);
  const [isBreak, setIsBreak] = useState(false);

  // Function to format and convert the time to "mm:ss"
  // https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours
  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

    return [
	minutes.toString().padStart(2, "0"),
	seconds.toString().padStart(2, "0")
    ].join(":");
  }

  // Reset session to default values
  // and stop the timer
  const resetSession = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(MINMIL * 25);
    setStop(true);
    
    // Reset <AUDIO>
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    return 
  }

  // Start/Stop the timer based off of `stop` value
  // TODO: Add a check so this can continue after break
  useEffect(() => {
    if (timeLeft <= 0 && !isBreak) {
      setIsBreak(true);
      setTimeLeft(parseInt(breakLength) * MINMIL);
      document.getElementById("beep").play();
    } else if (timeLeft <= 0 && isBreak) {
      setIsBreak(false);
      setTimeLeft(parseInt(sessionLength) * MINMIL);
      document.getElementById("beep").play();
    }
    
    if (!stop) {
      const intervalId = setInterval(() => {
	setTimeLeft(parseInt(timeLeft) - 1000);
      }, 1000);

      // Cleanup
      return () => clearInterval(intervalId);
    }
  }, [stop, timeLeft, isBreak, breakLength, sessionLength]);

  // Handle <INPUT> elements
  const handleInput = (e, session) => {
    if (e.target.value <= 0 || e.target.value >= 60) {
      return
    }

    if (session) {
      setSessionLength(e.target.value);
      setTimeLeft(parseInt(e.target.value) * MINMIL);
      setStop(true);
      return
    }

    // Handle break length
    setBreakLength(e.target.value);
    setStop(true);
    return
  };

  // Handle <BUTON> click
  const handleBreakBtnClick = (increment) => {
    if (increment && parseInt(breakLength) < 59) {
      setBreakLength(parseInt(breakLength) + 1);
    } else if (!increment && parseInt(breakLength) > 1) {
      setBreakLength(parseInt(breakLength) - 1);
    }

    setStop(true);
    return
    
  }

  const handleSessionBtnClick = (increment) => {
    if (increment && parseInt(sessionLength) < 59) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(parseInt(sessionLength + 1) * MINMIL);
    } else if (!increment && parseInt(sessionLength) > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(parseInt(sessionLength - 1) * MINMIL);
    }

    setStop(true);
    return
  }

  const handleStartStop = (stop) => {
    if (stop) {
      // Reset <AUDIO>
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
    }

    setStop(stop);
    return
  }

  return(
    <div className="container timer-main-container shadow-lg border bg-dark">
      {/* Time left display */}
      <div className="timer-display rounded border bg-body-tertiary">
	<p id="timer-label">{(isBreak) ? "Break" : "Session"}</p>
	<h1 id="time-left">{formatTime(timeLeft)}</h1>

      </div>

      {/* Set break length container */}
      <div className="set-break-container border bg-body-tertiary rounded">
      {/* BREAK Length <FORM> */}
      <form onSubmit={(e) => e.preventDefault()} className="break-form">
	<label
	className="border border-black"
	id="break-label"
	htmlFor="break-length">Break Length</label>

	{/* Break <input> */}
	<input
	className="border border-black"
	onChange={(e) => handleInput(e, false)}
	type="number"
	min="1"
	max="59"
	placeholder={5}
	id="break-length"
	value={breakLength}/>

	<button
	className="btn btn-lg btn-outline-warning btn-dark"
	onClick={() => handleBreakBtnClick(false)}
	id="break-decrement">Break -</button>

	<button
	className="btn btn-lg btn-outline-warning btn-dark"
	onClick={() => handleBreakBtnClick(true)}
	id="break-increment">Break +</button>
      </form>

      {/* Session Length <FORM> */}
      <form onSubmit={(e) => e.preventDefault()} className="session-form">
	<label
	className="border border-black"
	id="session-label"
	htmlFor="session-length">Session Length</label>

	{/* Session <input> */}
	<input
	className="border
	border-black"
	onChange={(e) => handleInput(e, true)}
	type="number"
	min="1"
	max="59"
	placeholder={25}
	id="session-length"
	value={sessionLength}/>

	<button
	className="btn btn-lg btn-outline-warning btn-dark"
	onClick={() => handleSessionBtnClick(false)}
	id="session-decrement">Session -</button>

	<button
	className="btn btn-lg btn-outline-warning btn-dark"
	onClick={() => handleSessionBtnClick(true)}
	id="session-increment">Session +</button>
      </form>
      </div>

      {/* Start/Stop/Reset the timer container <BUTTON> */}
      <div className="start-stop-reset-container">
	<button
	className="btn btn-lg btn-outline-warning btn-success"
	id="start_stop"
	onClick={() => handleStartStop(!stop)}>{(stop === true) ? "Start" : "Stop"}</button>

	{/* RESET <BUTTON> */}
	<button
	className="btn btn-lg btn-outline-warning btn-danger" 
	onClick={resetSession}
	id="reset">Reset</button>
      </div>

      <footer>
	<p className="text-white text-center">Created by <a href="https://github.com/mr-n30">mr-n30</a> on GitHub</p>
      </footer>
      {/* Beep Audio when session/break are finished */}
      <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  )
}
