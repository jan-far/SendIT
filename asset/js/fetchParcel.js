let selectedRow;

function getHostUrl() {
  if (window.location.host.indexOf('localhost')) {
    return 'http://127.0.0.1:3000/api/v1/';
  }
  console.log('remote host');
  return '/api/v1/';
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

function resetForm() {
  document.querySelector('#email').value = '';
  document.querySelector('#weight').value = '';
  document.querySelector('#destination').value = '';
  document.querySelector('#pickup').value = '';
  document.querySelector('#phoneNo').value = '';
  document.querySelector('#submit').value = 'Create Oder';
  selectedRow = null;
}

function Edit(td) {
  selectedRow = td.parentElement.parentElement;
  sessionStorage.setItem('selected', selectedRow.cells[0].innerHTML);

  document.querySelector('#email').setAttribute('disabled', true);
  document.querySelector('#weight').setAttribute('disabled', true);
  document.querySelector('#pickup').setAttribute('disabled', true);
  document.querySelector('#phoneNo').setAttribute('disabled', true);

  document.querySelector('#email').value = selectedRow.cells[1].innerHTML;
  document.querySelector('#weight').value = selectedRow.cells[2].innerHTML;
  document.getElementById('destination').value = selectedRow.cells[3].innerHTML;
  document.querySelector('#pickup').value = selectedRow.cells[4].innerHTML;
  document.querySelector('#phoneNo').value = selectedRow.cells[5].innerHTML;

  document.querySelector('#submit').value = 'Update Destination';
}

function Delete(td) {
  if (confirm('Are you sure to delete this record?')) {
    row = td.parentElement.parentElement;
    document.getElementById('parcelTable').deleteRow(row.rowIndex);
    resetForm();
    deleteParcel(td);
  }
}

const url = getHostUrl();
const token = getCookie('session_');
let cell0;
let formData;
let search;

function insertnewRow(data) {
  const table = document.getElementById('parcelTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.length);

  cell0 = newRow.insertCell(0);

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
  cell7.innerHTML = '<button onclick="onFOrmSubmit(this)">Edit</button>';

  const cell8 = newRow.insertCell(8);
  cell8.innerHTML = '<button onclick="Delete(this)" >Cancel Order</button>';
}

// async function createParcel() {
//   formData = new FormData(form);
//   search = new URLSearchParams();

//   for (const pair of formData) {
//     search.append(pair[0], pair[1]);
//     // console.log(pair[0], pair[1]);
//   }

//   try {
//     const signup = await fetch(`${url}parcels`, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'x-access-token': token,
//       },
//       method: 'POST',
//       body: search,
//     });
//     const res = await signup.json();
//     const data = await res;

//     if (!res) {
//       console.log('error occured');
//     } else if (data.rows === [] || data.rowCount === 0) {
//       console.log('an empty data');
//       // pBody.innerHTML = 'NO PARCEL ORDER HAS BEEN MADE! ';
//     } else {
//       for (let i = 0; i < data.rowCount; i++) {
//         insertnewRow(data.rows[i]);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     // modelText.innerHTML = 'Error when registering! Try again...';
//     // modal.style.display = 'flex';
//     // modelText.style.transition = '2s linear';
//     return err;
//   }
// }

async function deleteParcel(td) {
  const currentParcel = JSON.parse(getCookie('parcels'));
  row = td.parentElement.parentElement;

  const c = row.cells[0].innerHTML;
  console.log(c, currentParcel);
  try {
    const res = await fetch(`${url}parcels/${currentParcel[c - 1]}/cancel`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': `${token}`,
      },
      method: 'DELETE',
    });
    const result = await res.json();
    const data = await result;

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// async function updateParcel(td) {
//   const currentParcel = JSON.parse(getCookie('parcels'));
//   row = td.parentElement.parentElement;

//   const c = row.cells[0].innerHTML;
//   console.log(c, currentParcel);

//   try {
//     const res = await fetch(`${url}parcels/${row}/destination`, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'x-access-token': `${token}`,
//       },
//       method: 'PUT',
//     });
//     const result = await res.json();
//     const data = await result;

//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }
