/* eslint-disable prettier/prettier */

const Calendario = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [dateState, setDate] = React.useState({
    dateStart: today,
    dateEnd: today,
    geoJson: {},
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
      console.log('consultado de un solo dia')
      geoJsonData = await getByDate(dateState.dateStart);
    } else {
      console.log('consultado entre 2 dias')
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
    <div className="form">
      <form onSubmit={onSubmit}>
        <input
          type="date"
          name="dateStart"
          max={today}
          value={dateState.dateStart}
          onChange={({target}) => onChange(target.value, target.name)}
        />
        <input
          type="date"
          name="dateEnd"
          value={dateState.dateEnd}
          min={dateState.dateStart}
          max={today}
          onChange={({target}) => onChange(target.value, target.name)}
        />
        <button type="submit">Consultar</button>
        <div className="">
          {dateState.dateStart == dateState.dateEnd ? <span>Consultado focos de calor de {dateState.dateStart} </span>
            : <span>consultado focos de calor en {dateState.dateStart} hasta {dateState.dateEnd}</span>
          }
        </div>
        {
          loading && <div>Cargando</div>
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
