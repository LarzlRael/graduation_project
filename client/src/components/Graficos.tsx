import { CountDepProMun } from '../interfaces/countProvinceDepartamento.interface'
import { CircularProgress } from '@material-ui/core'
import { useGraficos } from '../hooks/useGraficos'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useRef, useEffect } from 'react'
import { LoadingElipsis } from './widgets/LoadingElipsis';

export interface GraphProps {
  info?: CountDepProMun
  nombreDepartamento: string
  loading: boolean
  ref: any
}

export const Graficos = (graphProps: GraphProps) => {
  const {
    changeTypeGraph,
    ShowGraphic,
    graphType,
    graphTypeArray,
    tipoGrafico,
  } = useGraficos(graphProps)

  const { loading, info } = graphProps

  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, myRef.current?.offsetTop ? myRef.current?.offsetTop : 0)
  }, [loading])

  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Tipo de grafico</InputLabel>
        <Select
          autoWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          renderValue={(value) => `${graphType}`}
          value={graphType}
          onChange={({ target }) => changeTypeGraph(target.value)}
        >
          {graphTypeArray.map((graph) => (
            <MenuItem key={graph} value={graph}>
              {graph}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <LoadingElipsis />
      ) : info?.resp.length === 0 ? (
        <div>No se encontraron datos</div>
      ) : (
        <div
          ref={myRef}
          className={`${tipoGrafico === 'circular' && 'grafic-circle'}`}
        >
          <ShowGraphic />
        </div>
      )}
    </>
  )
}
