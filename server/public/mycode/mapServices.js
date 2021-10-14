const baseUrl = 'http://localhost:4000';

const getByDate = async function (date) {
  const respuesta = await fetch(`${baseUrl}/maps/getbyDate/${date}`);
  const data = await respuesta.json();
  return data;
};

const getByBetweenDate = async function (dateStart, dateEnd) {
  const rawResponse = await fetch(`${baseUrl}/maps/getbybetweendate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateStart,
      dateEnd,
      orderBy: 'ASC',
    }),
  });
  return await rawResponse.json();
};

const getHeatSourcesByDeparment = async function (
  dateStart,
  dateEnd,
  departament,
) {
  const rawResponse = await fetch(`${baseUrl}/maps/getheatsourcesbydeparment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateStart,
      dateEnd,
      departament,
    }),
  });

  return await rawResponse.json();
};
