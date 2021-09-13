const consulta = async function (date) {
  // espera (await) una respuesta de fetch()
  const respuesta = await fetch(`http://localhost:4000/maps/getbyDate/${date}`);
  // espera (await) el blob
  const data = await respuesta.json();
  return data;
};
