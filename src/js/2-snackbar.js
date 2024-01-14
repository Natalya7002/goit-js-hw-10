import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function fulfilled(delay) {
  iziToast.success({
    message: `Fulfilled promise in ${delay}ms`,
  });
}

function rejected(delay) {
  iziToast.error({
    message: `Rejected promise in ${delay}ms`,
  });
}

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  state: document.querySelectorAll('input[name="state"]'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = refs.delay.value;
  const state = [...refs.state].find(el => el.checked).value;

  if (state === 'fulfilled') {
    setTimeout(() => fulfilled(delay), delay);
  }

  if (state === 'rejected') {
    setTimeout(() => rejected(delay), delay);
  }
});
