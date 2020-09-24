/* When the user clicks on the button,toggle between hiding and showing the dropdown content */
const sidenav = document.querySelector('.side-dropdown');
const url = 'http://127.0.0.1:3000/api/v1/';
const profile = document.querySelector('.profile');
const profileDetails = document.querySelector('.profile-details');
const profileHistory = document.querySelector('.profile-history');
const profileInfo = document.querySelector('.profile-info');
const token = JSON.parse(sessionStorage.getItem('_sendit_session_'));
const pBody = document.querySelector('.parcelBody');

const toggler = (x) => {
  x.classList.toggle('change');
  sidenav.classList.toggle('show');
};

function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

window.onload = async () => {
  // document.onreadystatechange = async () => {
  // }
  try {
    const res = await fetch(`${url}parcels`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': `${token}`,
      },
      method: 'GET',
    });
    const result = await res.json();
    const data = result;

    if (!result) {
      console.log('error occured');
    } else if (data.rows === [] || data.rowCount === 0) {
      console.log('an empty data');
      pBody.innerHTML = 'NO PARCEL ORDER HAS BEEN MADE! '
    } else {
      console.log(" ");
    }
  } catch (err) {
    console.log(err);
  }
  // }
};

profileDetails.addEventListener('toggle', async (e) => {
  if (e.target.open === false) {
    console.log(e.target.open);
    return;
  }
  try {
    const res = await fetch(`${url}users`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': `${token}`,
      },
      method: 'GET',
    });
    const result = await res.json();
    const data = result.Profile;

    profileCatch(data);
    // console.log(sessionStorage.key('1'))
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

function profileCatch(data) {
  profileInfo.innerHTML = `
  <form>
  <fieldset>
    <div class="form-field">
    <label for="full name">Full Name: </label>
    <input type="text" name="full name" id="email" value="${data.firstname} ${data.lastname}" disabled>
    </div>
    <div class="form-field">
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" value="${data.email}" disabled>
    </div>
    <div class="form-field">
    <label for="phone">Mobile Number: </label>
    <input type="text" name="phone" id="phone" value="${data.phone}" disabled>
    </div>
    <div class="form-field">
    <label for="location">My location: </label>
    <input type="text" name="location" id="location" value="${data.location}" disabled>
    </div>
  </fieldset>
  </form>
  `;
}

function insertParcel(data) {
  const table = document.getElementById('parcelTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.length);

  const cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.email;

  const cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.weight;

  const cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.destination;

  const cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.location;

  const cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.phone;

  const cell6 = newRow.insertCell(5);
  cell6.innerHTML = data.weight * 2;
}

async function isLoggedIn () {
  if (!token) return false

  // Checks validity of token
  const res = await fetch(`${url}users`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token,
    },
    method: 'GET',
  });
  const result = await res.json();
  sessionStorage.setItem('_sendit_session_', result.Token);
  return true;
};

async function autoRedirect() {
  const validLogin = await isLoggedIn();

  if (!validLogin) {
    console.log('invalid');
    window.location.href = ('../UI/signIn.html');
  }
  // if (validLogin) {
  //   console.log('valid');
  //   window.location.href = '../UI/user.html';
  // }
}

autoRedirect();