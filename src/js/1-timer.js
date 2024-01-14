import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let startButton = document.getElementById('start-timer');
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
      iziToast.warning({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const timer = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    document.querySelector('span[data-days]').textContent =
      addLeadingZero(days);
    document.querySelector('span[data-hours]').textContent =
      addLeadingZero(hours);
    document.querySelector('span[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('span[data-seconds]').textContent =
      addLeadingZero(seconds);

    if (deltaTime < 1000) {
      clearInterval(timer);
      document.querySelector('span[data-days]').textContent = '00';
      document.querySelector('span[data-hours]').textContent = '00';
      document.querySelector('span[data-minutes]').textContent = '00';
      document.querySelector('span[data-seconds]').textContent = '00';
    }
  }, 1000);
});
