import { useState, useRef } from 'react'
import { useEffect, useContext } from 'react'
import { ChartData, ChartOptions } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import moment from 'moment'
import {
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { FormControlLabel } from '@material-ui/core'
import { meses } from '../../data/data'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import {
  getOnlyYear,
  getRandomColor,
  getOnlyMonth,
  isYear,
} from '../../utils/utils'
import { LoadingElipsis } from '../../components/widgets/LoadingElipsis'
import useAxiosAuth from '../../hooks/useAxios'
import { convertMonths } from '../../utils/utils';

moment.locale('es')

export const GraphByMonths = () => {
  const {
    setMounthSelected,
    getHeatSourcesInfoToGragh,
    mounthAndYearSelected,
    titleArray,
    loadingState,
    countByDates,
  } = useContext(HeatSourcesContext)

  useEffect(() => {
    getHeatSourcesInfoToGragh(
      mounthAndYearSelected.month,
      mounthAndYearSelected.year,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounthAndYearSelected])

  const [lineGraph, setLineGraph] = useState(false)

  const data: ChartData = {
    labels: titleArray,
    datasets: [
      {
        label: `Focos de calor`,
        data: countByDates?.resp.map((ele) => parseInt(ele.focos_calor))
          ? countByDates?.resp.map((ele) => parseInt(ele.focos_calor))
          : [],
        backgroundColor: titleArray.map(() => getRandomColor()),
        borderColor: titleArray.map(() => getRandomColor()),
        borderWidth: 3,
      },
    ],
  }
  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        /* text: `Focos de calor en ${meses[mounthAndYearSelected.month]}`, */
        text: `Focos de calor en xd`,
      },
    },
    elements: {
      bar: {
        borderWidth: 5,
      },
    },
  }

  const { response, loading } = useAxiosAuth({
    url: '/analysis/available-mounth',
  })
  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, myRef.current?.offsetTop ? myRef.current?.offsetTop : 0)
  }, [mounthAndYearSelected])

  const handleChange = (value: string) => {
    if (isYear(value)) {
      setMounthSelected({
        month: 0,
        year: parseInt(value),
        onlyYear: true,
      })
    } else {
      setMounthSelected({
        month: getOnlyMonth(value),
        year: getOnlyYear(value),
        onlyYear: false,
      })
    }
  }
  // list of mouths with year field

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={lineGraph}
            onChange={(e) => setLineGraph(e.target.checked)}
          />
        }
        label={`Grafico de ${!lineGraph ? 'Lineas' : 'Puntos'}`}
      />

      {loading ? (
        <LoadingElipsis />
      ) : (
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Seleccionar Fecha
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={mounthAndYearSelected}
            onChange={(e) => handleChange(e.target.value.toString())}
          >
            {response?.years?.map((mes: any, i: number) => (
              <MenuItem key={mes} value={mes}>
                {convertMonths(mes)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {loadingState ? (
        <LoadingElipsis />
      ) : (
        <div ref={myRef}>
          {lineGraph ? (
            <Line data={data} options={options} />
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      )}
    </>
  )
}
