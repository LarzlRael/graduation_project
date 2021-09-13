async function funcionAsincrona(url) {
  // espera (await) una respuesta de fetch()
  const respuesta = await fetch(url);
  // espera (await) el blob
  const data = await respuesta.json();
  console.log(data);
}

var json_FocosdecalorBolivia_1 = funcionAsincrona(
  'http://localhost:4000/maps/getbyDate/2020-11-11',
);
