const sidenav = document.querySelector('.sidemenu');
const token = sessionStorage.getItem('session_');
const url = 'http://127.0.0.1:3000/api/v1/';

const toggler = (x) => {
  x.classList.toggle('change');
  sidenav.classList.toggle('active');
};

async function isLoggedIn() {
  if (!token) return false;

  // Checks validity of token
  const res = await fetch(`${url}users`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': `${token}`,
    },
    method: 'GET',
  });
  const result = await res.json();
  sessionStorage.setItem('session_', result.Token);
  return true;
}

async function autoRedirect() {
  const validLogin = await isLoggedIn();

  if (!validLogin) {
    console.log('invalid');
    window.location.href = ('../UI/redirect.html');
  }
}

autoRedirect();
