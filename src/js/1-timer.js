import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const startButton = document.querySelector('button[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
      stopTimer();
    }
  },
};

flatpickr('#datetime-picker', options);

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

const timer = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    timer.days.textContent = addLeadingZero(days);
    timer.hours.textContent = addLeadingZero(hours);
    timer.minutes.textContent = addLeadingZero(minutes);
    timer.seconds.textContent = addLeadingZero(seconds);

    if (deltaTime < 1000) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timer.days.textContent = '00';
  timer.hours.textContent = '00';
  timer.minutes.textContent = '00';
  timer.seconds.textContent = '00';
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  if (userSelectedDate === null) {
    return;
  }

  startTimer();
});
