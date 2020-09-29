import API from './host.js';

const form = document.querySelector('.form');
// const url = 'http://127.0.0.1:3000/api/v1/';
let url;
const notiPanel = document.querySelector('.noti-panel');
const notification = document.querySelector('.notification');
const span = document.querySelector('.close');

notiPanel.style.display = 'none';

span.onclick = () => {
  notiPanel.style.display = 'none';
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  url = API.getHostUrl();
  console.log(url);

  const formdata = new FormData(form);
  const params = new URLSearchParams();

  // inputs.innerHTML= ""

  for (const pairs of formdata) {
    if (pairs[0] === 'email') {
      pairs[1] = pairs[1].toLowerCase();
    }

    params.append(pairs[0], pairs[1]);
  }

  try {
    const req = await fetch(`${url}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const res = await req.json();
    const data = await res;

    if (data === undefined || req.status === 400) {
      notiPanel.classList.add('failed');
      notiPanel.classList.remove('successful');
      notiPanel.style.display = 'flex';
      notification.innerHTML = `${res.message}`;
    } else {
      console.log(data);
      notiPanel.classList.add('successful');
      notiPanel.classList.remove('failed');
      notiPanel.style.display = 'flex';
      notification.innerHTML = `${res.message}`;
      API.setCookie('session_', `${res.Profile.token}`, 3);
      window.location.href = '../UI/dashboard.html';
      return;
    }
  } catch (err) {
    console.log(err);
  }
});
