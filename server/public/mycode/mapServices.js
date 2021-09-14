const getByDate = async function (date) {
  const respuesta = await fetch(`http://localhost:4000/maps/getbyDate/${date}`);
  const data = await respuesta.json();
  return data;
};

const getByBetweenDate = async function (dateStart, dateEnd) {
  const rawResponse = await fetch(
    'http://localhost:4000/maps/getbybetweendate',
    {
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
    },
  );
  return await rawResponse.json();
};