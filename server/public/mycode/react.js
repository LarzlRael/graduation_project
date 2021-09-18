/* eslint-disable prettier/prettier */
const Loading = () => {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

const Calendario = () => {

  const date = new Date();
  date.setHours(date.getHours() - 4);
  const today = date.toISOString().slice(0, 10);


  const [dateState, setDate] = React.useState({
    dateStart: today,
    dateEnd: today,
    geoJson: null,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    mostrarPuntos();
  }, [])

  const onChange = async (value, campo) => {
    setDate({
      ...dateState,
      [campo]: value
    });
  }

  const mostrarPuntos = async () => {
    let geoJsonData;
    setLoading(true);
    if (dateState.dateStart === dateState.dateEnd) {

      geoJsonData = await getByDate(dateState.dateStart);
    } else {
      geoJsonData = await getByBetweenDate(dateState.dateStart, dateState.dateEnd);
    }
    setLoading(false);


    setDate(prevState => ({
      ...prevState,
      geoJson: geoJsonData,
    }));
    console.log(dateState);
    pintarMapa(dateState.dateStart, geoJsonData);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    mostrarPuntos();
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
        <span className="fromTo">Hasta</span>
        <input
          type="date"
          name="dateEnd"
          value={dateState.dateEnd}
          min={dateState.dateStart}
          max={today}
          onChange={({target}) => onChange(target.value, target.name)}
        />
        <button type="submit">Consultar</button>
        <div className="information">
          {dateState.dateStart == dateState.dateEnd ? <span>Consultado focos de calor de: <br /> <b>{dateState.dateStart}</b> </span>
            : <span>Consultado focos de calor en: <br /> <b>{dateState.dateStart}</b> hasta <b>{dateState.dateEnd}</b></span>
          }
          <br />
          Se registraron <b>{dateState.geoJson === null ? '0' : dateState.geoJson.features.length}</b> focos de calor
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
