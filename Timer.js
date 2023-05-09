var [ milseconds, seconds, minutes, hours ] = [0,0,0,0];
var display = document.querySelector('.display')
var stopwatch = null;

const start = document.querySelector('.start')
const pause = document.querySelector('.pause')
const reset = document.querySelector('.reset')

start.addEventListener('click', () => {
    if(stopwatch!==null){
        clearInterval(stopwatch)
    }
    stopwatch = setInterval(startButton, 10);
})

pause.addEventListener('click', () => {
    clearInterval(stopwatch)
})

reset.addEventListener('click', () => {
    [ seconds, minutes, hours ] = [0, 0, 0]
    document.querySelector('.display').innerHTML = '00 : 00 : 00 : 00'
    clearInterval(stopwatch)
})

function startButton(){
    milseconds+=1
    if (milseconds == 100) {
        milseconds = 0
        seconds++

        if(seconds == 60){
            seconds = 0
            minutes++
    
            if(minutes == 60){
                minutes = 0
                hours++
            }
        }
    }

    var h = hours < 10 ? "0" + hours : hours
    var m = minutes < 10 ? "0" + minutes : minutes
    var s = seconds < 10 ? "0" + seconds : seconds
    var ms = milseconds < 10 ? "0" + milseconds : milseconds

    display.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`
}

let finalDate = null;
let timerId = null;

document
  .getElementById("countdown-button")
  .addEventListener("click", function () {
    initTimer();
  });

function initTimer() {
  clearInterval(timerId);

  finalDate = document.getElementById("final-date-input").value;
  console.log(finalDate);

  if (finalDate == "") return;
  finalDate = new Date(finalDate);

  document.getElementById("message").style.display = "none";

  timer();
  timerId = setInterval(timer, 1000);
}

function timer() {
  const now = new Date().getTime();

  let interval = (finalDate.getTime() - now) / 1000;
  interval = Math.floor(interval);
  console.log(interval);

  if (interval <= 0) {
    document.getElementById("message").style.display = "block";
    clearInterval(timerId);
    clearTimer();
    return;
  }

  let days = Math.floor(interval / (60 * 60 * 24));
  let hours = Math.floor((interval % (60 * 60 * 24)) / (60 * 60));
  let minutes = Math.floor((interval % (60 * 60)) / 60);
  let seconds = Math.floor(interval % 60);

  setHtmlBySelector("#days", days);
  setHtmlBySelector("#hours", hours);
  setHtmlBySelector("#minutes", minutes);
  setHtmlBySelector("#seconds", seconds);
}

function setHtmlBySelector(selector, value) {
  document.querySelector(selector).innerHTML = value;
}

function clearTimer() {
  setHtmlBySelector("#days", "-");
  setHtmlBySelector("#hours", "-");
  setHtmlBySelector("#minutes", "-");
  setHtmlBySelector("#seconds", "-");
}