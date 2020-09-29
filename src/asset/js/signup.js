import API from './host.js';

const input = document.querySelector('#phone');
const IntNumber = window.intlTelInput(input, {
  utilsScript: '../asset/js/utils.js',
});

window.intlTelInput(input, {
  preferredCountries: ['ng'],
});

const url = API.getHostUrl();
const form = document.querySelector('.form');
const modelText = document.querySelector('.model-text');
const modal = document.querySelector('.modal');
const span = document.getElementsByClassName('close')[0];
let formData;
let search;

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  formData = new FormData(form);
  search = new URLSearchParams();

  for (const pair of formData) {
    if (pair[0] === 'phone') {
      pair[1] = IntNumber.getNumber();
    }

    search.append(pair[0], pair[1]);
    // console.log(pair[0], pair[1]);
  }

  try {
    const signup = await fetch(`${url}auth/signup`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: search,
    });
    const res = await signup.json();
    const data = await res;

    if (data) {
      // console.log(data);
      modelText.innerHTML = `${data.message}`;
      modal.style.display = 'flex';
      modelText.style.transition = '2s linear';
      return;
    }
  } catch (err) {
    console.log(err);
    modelText.innerHTML = 'Error when registering! Try again...';
    modal.style.display = 'flex';
    modelText.style.transition = '2s linear';
    return err;
  }
});
