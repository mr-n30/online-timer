export default function SetBreakContainer({
  setBreakLength,
  breakLength,
  setSessionLength,
  sessionLength,
  timeLeft,
  setTimeLeft}) {
  // Handle onClick
  const handleBtnClick = (inc, sbLen, fn) => {
    if (inc === true && sbLen < 60) {
      fn(sbLen + 1)
      return
    }

    if (sbLen > 0) {
      fn(sbLen - 1);
    }

    return;
  }

  return(
    <div className="set-break-container">
      {/* Break Length */}
      <form onSubmit={(e) => e.preventDefault()} className="break-form">
	<label id="break-label" htmlFor="break-length">Break Length</label>
	<input type="number" min="0" max="59" placeholder={5} id="break-length" value={breakLength} onChange={(e) => setBreakLength(e.target.value)}/>
	<button onClick={() => handleBtnClick(true, breakLength, setBreakLength)} id="break-increment">Break +</button>
	<button onClick={() => handleBtnClick(false, breakLength, setBreakLength)} id="break-decrement">Break -</button>
      </form>

      {/* Session Length */}
      <form onSubmit={(e) => e.preventDefault()} className="session-form">
	<label id="session-label" htmlFor="session-length">Session Length</label>
	<input type="number" min="0" max="59" placeholder={25} id="session-length" value={sessionLength} onChange={(e) => setSessionLength(e.target.value)}/>
	<button onClick={() => handleBtnClick(true, sessionLength, setSessionLength)} id="session-increment">Session +</button>
	<button onClick={() => handleBtnClick(false, sessionLength, setSessionLength)} id="session-decrement">Session -</button>
      </form>
    </div>
  );
}
