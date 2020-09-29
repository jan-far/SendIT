import API from './host.js';

const url = API.getHostUrl();
// const profile = document.querySelector('.profile');
const profileDetails = document.querySelector('.profile-details');
const record = document.querySelector('.order-record');
const profileInfo = document.querySelector('.profile-info');
const token = API.getCookie('session_');
const pBody = document.querySelector('.parcelBody');

API.autoRedirect();
let count = 0;

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
    const data = await result;

    if (!result) {
      console.log('error occured');
    } else if (data.rows === [] || data.rowCount === 0) {
      console.log('an empty data');
      pBody.innerHTML = 'NO PARCEL ORDER HAS BEEN MADE! ';
    } else {
      for (let i = 0; i < data.rowCount; i += 1) {
        insertParcel(data.rows[i]);
        if (data.rows[i].status !== 'delivered') {
          count += 1;
        }
        records(data, count, (data.rowCount - count));
      }
    }
  } catch (err) {
    console.log(err);
  }
  // }
};

profileDetails.addEventListener('toggle', async (e) => {
  if (e.target.open === false) {
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
  } catch (err) {
    console.log(err);
  }
});

function records(total, pedinging, delivered) {
  record.innerHTML = `
  <div class="pending">
      Pending Order: ${pedinging}
  </div>
  <div class="delivered">
      Order Delivered: ${delivered}
  </div>
  <div class="total">
      My total Order: ${total.rowCount}
  </div>
  `;
}
