import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  state: document.querySelectorAll('input[name="state"]'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = refs.delay.value;
  const state = [...refs.state].find(el => el.checked).value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
