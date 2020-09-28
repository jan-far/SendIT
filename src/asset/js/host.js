function getHostUrl() {
  if (window.location.origin.indexOf('127.0.0.1') === 7) {
    console.log('localhost');
    return 'http://127.0.0.1:3000/api/v1/';
  }
  console.log('remote host', window.location.origin);
  return '/api/v1/';
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
  return document.cookie;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const url = getHostUrl();
const token = getCookie('session_');

async function isLoggedIn() {
  if (!token) return false;

  // Checks validity of token
  const res = await fetch(`${url}users`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token,
    },
    method: 'GET',
  });
  const result = await res.json();

  if (result.message === 'invalid token') return false;
  return true;
}

async function autoRedirect() {
  const validLogin = await isLoggedIn();

  if (!validLogin) {
    console.log('invalid');
    window.location.href = ('../UI/redirect.html');
  }
}

export default {
  setCookie,
  getCookie,
  getHostUrl,
  autoRedirect,
};
