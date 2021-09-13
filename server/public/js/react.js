/* eslint-disable prettier/prettier */


const Calendario = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [dateState, setDate] = React.useState(today);

  React.useEffect(() => {
    mostrarPuntos(dateState);
  }, [])

  const onChange = async (value) => {
    setDate(value);
    mostrarPuntos();
  }

  const mostrarPuntos = async () => {
    const geoJson = await getByDate(dateState);
    pintarMapa(dateState, geoJson);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <input
          type="date"
          name="calendario"
          value={dateState}
          onChange={({target}) => onChange(target.value, 'calendario')}
        />
        <button type="submit">Consultar</button>
      </form>
    </div>
  );
}


function App() {
  return (
    <div>
      <Calendario />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
