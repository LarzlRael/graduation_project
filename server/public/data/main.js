const form = document.querySelector('#form');
const date = document.querySelector('#calendario');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(date.value);
  pintarMapa(date.value);
});
