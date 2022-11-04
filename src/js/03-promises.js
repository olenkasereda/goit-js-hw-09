import { Notify } from 'notiflix/build/notiflix-notify-aio';

let getEl = selector => document.querySelector(selector);

getEl('.form').addEventListener('submit', onGetPromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve([position, delay]);
      }

      reject([position, delay]);
    }, delay);
  });
}

function onGetPromises(e) {
  e.preventDefault();

  const formEl = e.currentTarget.elements;
  let delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);
  console.log(delay, step, amount);

  for (let position = 1; position <= amount; position += 1) {
    if (position > 1) {
      delay = delay + step;
    }
    // console.log([position, delay]);

    createPromise(position, delay)
      .then(([position, delay]) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(([position, delay]) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
