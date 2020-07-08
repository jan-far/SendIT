const sidenav = document.querySelector('.sidemenu');
// window.addEventListener('r')
const toggler = (x) => {
    x.classList.toggle("change");
    sidenav.classList.toggle('active')
}