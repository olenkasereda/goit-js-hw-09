import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let getEl = selector => document.querySelector(selector);

getEl('button[data-start]').disabled = true;
getEl('button[data-start]').addEventListener('click', timer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onBtnActive(selectedDates[0]);
  },
};

const calendar = flatpickr('#datetime-picker', options);

function onBtnActive(time) {
  if (time - new Date() < 0) {
    getEl('button[data-start]').disabled = true;
    // window.alert('Please choose a date in the future');
    Notify.failure('Please choose a date in the future');
  } else {
    Notify.success('let`s start!');
    getEl('button[data-start]').disabled = false;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timeUpdate({ days, hours, minutes, seconds }) {
  getEl('[data-days]').textContent = addLeadingZero(days);
  getEl('[data-hours]').textContent = addLeadingZero(hours);
  getEl('[data-minutes]').textContent = addLeadingZero(minutes);
  getEl('[data-seconds]').textContent = addLeadingZero(seconds);
}

function timer() {
  // const startTime = +new Date();
  getEl('button[data-start]').disabled = true;
  getEl('#datetime-picker').disabled = true;
  let finishTime = calendar.selectedDates[0].getTime();

  const timerID = setInterval(() => {
    const startTime = Date.now();
    const delta = finishTime - startTime;

    timeUpdate(convertMs(delta));

    if (delta < 1000) {
      clearInterval(timerID);
      return;
    }
  }, 1000);
}
