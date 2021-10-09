/* eslint-disable prettier/prettier */
const Loading = () => {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

const getCurrentDate = (time) => {
  const date = new Date();
  switch (time) {
    case 'today':
      date.setHours(date.getHours());
      break;

    case 'yesterday':
      date.setHours(date.getHours() - 24);
      break;

    case 'week':
      date.setHours(date.getHours() - 168);
      break;
    case 'twoWeeks':
      date.setHours(date.getHours() - 336);
      break;
    case 'oneMounth':
      date.setHours(date.getHours() - 720);
      break;

    default:
      date.setHours(date.getHours());
  }
  date.setHours(date.getHours() - 4);
  return date.toISOString().slice(0, 10);

}

const departamentosBolivia = [
  'La Paz',
  'Oruro',
  'Potosi',
  'Santa Cruz',
  'Beni',
  'Pando',
  'Cochabamba',
  'Tarija',
  'Chuquisaca',
]
const Calendario = () => {

  const today = getCurrentDate('today');

  const [dateState, setDate] = React.useState({
    dateStart: today,
    geoJson: null,
  });
  const [message, setMessage] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    consultByRange('today');
  }, [])

  const onChange = async (value, campo) => {
    setDate({
      ...dateState,
      [campo]: value
    });
  }


  const consultByRange = async (range) => {
    let geoJsonData;
    setLoading(true);

    switch (range) {
      case 'today':
        geoJsonData = await getByBetweenDate(getCurrentDate('today'), getCurrentDate('today'));
        setMessage('Hoy');
        break;

      case '24hrs':
        geoJsonData = await getByBetweenDate(getCurrentDate('yesterday'), getCurrentDate('today'));
        setMessage('las ultimas 24 horas');
        break;

      case 'week':
        geoJsonData = await getByBetweenDate(getCurrentDate('week'), getCurrentDate('today'));
        setMessage('los ultimos 7 dias');
        break;

      case 'twoWeeks':
        geoJsonData = await getByBetweenDate(getCurrentDate('twoWeeks'), getCurrentDate('today'));
        setMessage('las ultimas 2 semanas');
        break;
      /* case 'oneMounth':
        geoJsonData = await getByBetweenDate(getCurrentDate('oneMounth'), getCurrentDate('today'));
        setMessage('hace un 1 mes');
        break; */

      default:
        break;
    }

    setLoading(false);

    setDate(prevState => ({
      ...prevState,
      geoJson: geoJsonData,
    }));

    pintarMapa(dateState.dateStart, geoJsonData);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const convertirFecha = (date) => {
    /* 2021-09-14 */
    const newDate = date.split('-');
    const datecurrent = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    return datecurrent;
  }



  return (
    <div className="calendar">
      <h3>Consultar Focos de calor</h3>
      <form onSubmit={onSubmit}>
        <span className="fromTo">Desde</span>

        <input
          type="date"
          name="dateStart"
          max={today}
          value={dateState.dateStart}
          onChange={({target}) => onChange(target.value, target.name)}
        />
        <label htmlFor="">Seleccionar Departamento</label>
        <select name="" id="">
          {departamentosBolivia.map((departament) =>
            (<option value={departament}>{departament}</option>))}
        </select>

        <div className="group-buttons">
          <button onClick={() => {consultByRange('today')}}>Hoy</button>
          <button onClick={() => {consultByRange('24hrs')}}>24 horas</button>
          <button onClick={() => {consultByRange('week')}}>7 dias</button>
        </div>


        <div className="information">
          <span>Consultado focos de calor de {message}</span>
        </div>
        {
          loading &&
          <Loading />
        }
      </form>
    </div>
  );
}


function App() {
  return (
    <React.Fragment>
      <Calendario />
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
