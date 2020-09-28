import API from './host.js';

const url = API.getHostUrl();
const token = API.getCookie('session_');
const form = document.querySelector('form');
const submit = document.querySelector('#submit');
// const edit = document.querySelector('.edit');
const parcels = {};
let cell0;
let formData;
let search;
let row;

API.autoRedirect();

function insertnewRow(data) {
  const table = document.getElementById('parcelTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.length);

  cell0 = newRow.insertCell(0);
  // console.log(cell0)
  // sessionStorage.setItem('cell0', cell0.innerHTML)

  const cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.email;

  const cell2 = newRow.insertCell(2);
  cell2.innerHTML = data.weight;

  const cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.destination;

  const cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.location;

  const cell5 = newRow.insertCell(5);
  cell5.innerHTML = data.phone;

  const cell6 = newRow.insertCell(6);
  cell6.innerHTML = data.weight * 2;

  const cell7 = newRow.insertCell(7);
  cell7.innerHTML = '<button class="edit" onclick="Edit(this)">Edit</button>';

  const cell8 = newRow.insertCell(8);
  cell8.innerHTML = '<button onclick="Delete(this)" >Cancel Order</button>';
}

window.addEventListener('load', async () => {
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
      // pBody.innerHTML = 'NO PARCEL ORDER HAS BEEN MADE! ';
    } else {
      for (let i = 0; i < data.rowCount; i++) {
        insertnewRow(data.rows[i]);
        // console.log(data.rows[i]);
        parcels[i] = data.rows[i].id;
        cell0.innerHTML = i + 1;
        console.log(cell0.innerHTML);
      }
      API.setCookie('parcels', JSON.stringify(parcels), 1);
    }
  } catch (err) {
    console.log(err);
  }
  // function onFormSubmit() {
  //   if (submit.value == null)
  //     insertnewRow(formData)
  //   else
  //     Update(formData);

  //   resetForm();
  // }
});

function readFormData() {
  let formData = {};
  const email = document.querySelector('#email').value;
  const destination = document.querySelector('#destination').value;
  const weight = document.querySelector('#weight').value;
  const phone = document.querySelector('#phoneNo').value;
  const pick = document.querySelector('#pickup').value;

  formData = {
    email,
    destination,
    weight,
    phone,
    pick,
  };
  return formData;
}

function resetForm() {
  document.querySelector('#email').value = '';
  document.querySelector('#weight').value = '';
  document.querySelector('#destination').value = '';
  document.querySelector('#pickup').value = '';
  document.querySelector('#phoneNo').value = '';
  document.querySelector('#submit').value = 'Create Order';
  // selectedRow = null;
}

async function updateParcel() {
  const currentParcel = JSON.parse(API.getCookie('parcels'));
  row = sessionStorage.getItem('selected');

  const c = row;
  console.log(c, row);

  formData = new FormData(form);
  search = new URLSearchParams();

  for (const pair of formData) {
    search.append(pair[0], pair[1]);
    // console.log(pair[0], pair[1]);
  }

  try {
    const res = await fetch(`${url}parcels/${currentParcel[c - 1]}/destination`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': `${token}`,
      },
      method: 'PUT',
      body: search,
    });
    const result = await res.json();

    if (result) {
      console.log(result.message);
    }
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', async () => {
  if (submit.value !== 'Update Destination') {
    insertnewRow(readFormData());
    console.log(cell0);

    formData = new FormData(form);
    search = new URLSearchParams();

    for (const pair of formData) {
      search.append(pair[0], pair[1]);
      // console.log(pair[0], pair[1]);
    }

    try {
      const signup = await fetch(`${url}parcels`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token,
        },
        method: 'POST',
        body: search,
      });
      const res = await signup.json();
      const data = await res;
      resetForm();

      if (!res) {
        console.log('error occured');
      } else if (data.rows === [] || data.rowCount === 0) {
        console.log('an empty data');
        // pBody.innerHTML = 'NO PARCEL ORDER HAS BEEN MADE! ';
      } else {
        for (let i = 0; i < data.rowCount; i++) {
          insertnewRow(data.rows[i]);
        }
        return;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  updateParcel();
  resetForm();
});
