/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const sidenav = document.querySelector('.side-dropdown');

const toggler = (x) => {
  x.classList.toggle("change");
  sidenav.classList.toggle('show')
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var selectedRow = null;

function onFormSubmit(){
  var data = readFromData();
  if (selectedRow == null)
      insertNewOrder(data)
      else
      Update(data);
  
  resetForm();
}

function readFromData() {
  var formData = {};
  var email = document.querySelector('#email').value;
  var weight = document.querySelector('#weight').value;
  var destination = document.querySelector('#destination').value;
  var pickup = document.querySelector('#pickup').value;
  var phoneNo = document.querySelector('#phoneNo').value;

  formData = {
    Email: email,
    Weight: weight,
    Destination: destination,
    Pickup: pickup,
    PhoneNo: phoneNo
  };
  return formData;
}

function insertNewOrder(data) {
  var table = document.getElementById('parcelTable').getElementsByTagName('tbody')[0];
  var newOrder = table.insertRow(table.length);

  cell1 = newOrder.insertCell(0);
  cell1.innerHTML = data.Email;

  cell2 = newOrder.insertCell(1);
  cell2.innerHTML = data.Weight;

  cell3 = newOrder.insertCell(2);
  cell3.innerHTML = data.Destination;

  cell4 = newOrder.insertCell(3);
  cell4.innerHTML = data.Pickup;

  cell5 = newOrder.insertCell(4);
  cell5.innerHTML = data.PhoneNo

  cell6 = newOrder.insertCell(5);
  cell6.innerHTML = Price()

  cell7 = newOrder.insertCell(6);
  cell7.innerHTML = `<button onclick="Edit(this)">Edit</button>`;

  cell8 = newOrder.insertCell(7);
  cell8.innerHTML = `<button onclick="Delete(this)">Cancel Order</button>`;
}

function Price() {
  var weight = document.querySelector('#weight').value;
  if (weight) {
    var price = weight * 20;
    return price;
  }
  // else{
  //   if(weight =='') {
  //       do{
  //       var user = prompt("Enter a valid Weigth value");
  //       return user;
  //     }while (weight =='')
  //   }

  //   else if (weight !=Number){
  //       do{
  //       var user = prompt("Weight value must be number");
  //       return user;
  //     }while(weight != Number);
  //   }
  //   else {
  //     return weight * user
  //   }
  // }  
}

function resetForm(){
  document.querySelector('#email').value = '';
  document.querySelector('#weight').value ='';
  document.querySelector('#destination').value = '';
  document.querySelector('#pickup').value = '';
  document.querySelector('#phoneNo').value = '';
  document.querySelector("#submit").value = "Create Oder";
  selectedRow = null;
}

function Edit(td){
  selectedRow = td.parentElement.parentElement;

  document.querySelector('#email').value = selectedRow.cells[0].innerHTML;
  document.querySelector('#weight').value =selectedRow.cells[1].innerHTML;
  document.getElementById('destination').value = selectedRow.cells[2].innerHTML;
  document.querySelector('#pickup').value = selectedRow.cells[3].innerHTML;
  document.querySelector('#phoneNo').value = selectedRow.cells[4].innerHTML;

  document.querySelector("#submit").value  = "Update Destination";
}

function Update(data){
  selectedRow.cells[2].innerHTML = data.Destination;
  resetForm()
}