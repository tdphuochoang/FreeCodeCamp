const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [play, setPlay] = React.useState(false);
  const [timingType, setTimingType] = React.useState("SESSION");
  const [timeLeft, setTimeLeft] = React.useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <section className="controller">
        <div id="break-label">
          <h2>Break Length</h2>
          <i
            disabled={play}
            onClick={handleBreakDecrease}
            id="break-decrement"
            className="fa-solid fa-arrow-down"
          ></i>
          <span id="break-length">{breakLength}</span>
          <i
            disabled={play}
            onClick={handleBreakIncrease}
            id="break-increment"
            className="fa-solid fa-arrow-up"
          ></i>
        </div>
        <div id="session-label">
          <h2>Session Length</h2>
          <i
            disabled={play}
            onClick={handleSessionDecrease}
            id="session-decrement"
            className="fa-solid fa-arrow-down"
          ></i>
          <span id="session-length">{sessionLength}</span>
          <i
            disabled={play}
            onClick={handleSessionIncrease}
            id="session-increment"
            className="fa-solid fa-arrow-up"
          ></i>
        </div>
      </section>
      <section className="timer">
        <h2 id="timer-label">{title}</h2>
        <h3 id="time-left">{timeFormatter()}</h3>
      </section>
      <section id="main-btns">
        <i
          onClick={handlePlay}
          id="start_stop"
          className="fa-solid fa-play"
        ></i>
        <i
          onClick={handleReset}
          id="reset"
          className="fa-solid fa-arrows-rotate"
        ></i>
      </section>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
