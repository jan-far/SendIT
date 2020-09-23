const form = document.querySelector('.form');
const url = 'http://127.0.0.1:3000/api/v1/';
const token = sessionStorage.getItem('token');
const notiPanel = document.querySelector('.noti-panel');
const notification = document.querySelector('.notification');
// const inputs = document.getElementsByTagName('input');

window.onclick = () => {
  notiPanel.style.display = 'none';
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

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
        'x-access-token': token,
      },
      body: params,
    });

    const res = await req.json();
    const data = await res;

    if (data === undefined || req.status === 400) {
      // console.log(req.status, req.status === `40 ${new RegExp('[0-9]','gm')}`);
      notiPanel.classList.add('failed');
      // notiPanel.style.display = 'flex';
      notiPanel.classList.remove('successful');
      notiPanel.innerHTML = 'Wrong credentials! check and Try again!';
    } else {
      console.log(res);
      notiPanel.classList.add('successful');
      notiPanel.classList.remove('failed');
      notification.innerHTML = `${res.message}`;
      // window.location.href = '../UI/createParcel.html';
      return (sessionStorage.setItem('session', JSON.stringify(res)));
    }
  } catch (err) {
    console.log(err);
  }
});
