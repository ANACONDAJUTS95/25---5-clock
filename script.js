document.addEventListener('DOMContentLoaded', () => {
    const breakDecrement = document.getElementById('break-decrement');
    const breakIncrement = document.getElementById('break-increment');
    const breakLength = document.getElementById('break-length');
  
    const sessionDecrement = document.getElementById('session-decrement');
    const sessionIncrement = document.getElementById('session-increment');
    const sessionLength = document.getElementById('session-length');
  
    const timerLabel = document.getElementById('timer-label');
    const timeLeft = document.getElementById('time-left');
    const startStopButton = document.getElementById('start_stop');
    const resetButton = document.getElementById('reset');
  
    const audio = document.getElementById('beep');
  
    let breakMinutes = 5;
    let sessionMinutes = 25;
    let isRunning = false;
    let intervalId = null;
    let currentTime = sessionMinutes * 60;
  
    function updateDisplay() {
      breakLength.textContent = breakMinutes;
      sessionLength.textContent = sessionMinutes;
      timerLabel.textContent = isRunning ? timerLabel.textContent : 'Session';
      timeLeft.textContent = formatTime(currentTime);
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
    function startStopTimer() {
      if (isRunning) {
        clearInterval(intervalId);
        intervalId = null;
        startStopButton.textContent = 'Start';
      } else {
        intervalId = setInterval(() => {
          currentTime--;
          if (currentTime <= 0) {
            audio.play();
            if (timerLabel.textContent === 'Session') {
              timerLabel.textContent = 'Break';
              currentTime = breakMinutes * 60;
            } else {
              timerLabel.textContent = 'Session';
              currentTime = sessionMinutes * 60;
            }
          }
          updateDisplay();
        }, 1000);
        startStopButton.textContent = 'Pause';
      }
      isRunning = !isRunning;
    }
  
    function resetTimer() {
      clearInterval(intervalId);
      intervalId = null;
      isRunning = false;
      breakMinutes = 5;
      sessionMinutes = 25;
      currentTime = sessionMinutes * 60;
      timerLabel.textContent = 'Session';
      audio.pause();
      audio.currentTime = 0;
      updateDisplay();
      startStopButton.textContent = 'Start';
    }
  
    breakDecrement.addEventListener('click', () => {
      if (!isRunning) {
        breakMinutes = Math.max(1, breakMinutes - 1);
        if (timerLabel.textContent === 'Break') {
          currentTime = breakMinutes * 60;
        }
        updateDisplay();
      }
    });
  
    breakIncrement.addEventListener('click', () => {
      if (!isRunning) {
        breakMinutes = Math.min(60, breakMinutes + 1);
        if (timerLabel.textContent === 'Break') {
          currentTime = breakMinutes * 60;
        }
        updateDisplay();
      }
    });
  
    sessionDecrement.addEventListener('click', () => {
      if (!isRunning) {
        sessionMinutes = Math.max(1, sessionMinutes - 1);
        if (timerLabel.textContent === 'Session') {
          currentTime = sessionMinutes * 60;
        }
        updateDisplay();
      }
    });
  
    sessionIncrement.addEventListener('click', () => {
      if (!isRunning) {
        sessionMinutes = Math.min(60, sessionMinutes + 1);
        if (timerLabel.textContent === 'Session') {
          currentTime = sessionMinutes * 60;
        }
        updateDisplay();
      }
    });
  
    startStopButton.addEventListener('click', startStopTimer);
    resetButton.addEventListener('click', resetTimer);
  
    updateDisplay();
  });
  