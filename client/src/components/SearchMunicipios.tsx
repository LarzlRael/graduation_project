import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { getRandomColor } from '../utils/utils';
import { Line, Bar } from 'react-chartjs-2';

import { meses } from '../data/data';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import moment from 'moment'
import { Switch } from '@mui/material'
import { FormControlLabel } from '@material-ui/core';

moment.locale('es');


export const SearchMunicipios = () => {
    const { setMounthSelected, getHeatSources, mounthSelected, titleArray, countByDates } = useContext(HeatSourcesContext);

    useEffect(() => {
        getHeatSources(mounthSelected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounthSelected]);

    const [lineGraph, setLineGraph] = useState(false);

    const data: ChartData = {
        labels: titleArray,
        datasets: [
            {
                label: `Focos de calor`,
                data: (countByDates?.resp.map(ele => parseInt(ele.focos_calor))) ? (countByDates?.resp.map(ele => parseInt(ele.focos_calor))) : [],
                backgroundColor: titleArray.map(() => (
                    getRandomColor()
                )),
                borderColor: titleArray.map(() => (
                    getRandomColor()
                )),
                borderWidth: 3,
            },
        ],
    };
    const options: ChartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: `Focos de calor en ${meses[mounthSelected]}`
            },
        },
        elements: {
            bar: {
                borderWidth: 5,
            },
        },
    };

    return (
        <>
            <FormControlLabel control={
                <Switch
                    checked={lineGraph}
                    onChange={(e) => setLineGraph(e.target.checked)}
                />
            } label={`Grafico de ${!lineGraph ? 'Lineas' : 'Puntos'}`} />
            <select
                value={mounthSelected}
                onChange={(e) => setMounthSelected(parseInt(e.target.value))}
            >
                {meses.map((mes, i) => (
                    <option value={i}>{mes}</option>
                ))}
            </select>
            {lineGraph ?
                <Line data={data} options={options} />
                :
                <Bar data={data} options={options} />
            }
        </>
    )


}


