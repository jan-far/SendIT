/* When the user clicks on the button,toggle between hiding and showing the dropdown content */
const sidenav = document.querySelector('.side-dropdown');

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
