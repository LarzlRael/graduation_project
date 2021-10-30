import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment'
import { Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormControlLabel } from '@material-ui/core';
import { meses } from '../../data/data';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';
import { getRandomColor } from '../../utils/utils';

moment.locale('es');


export const GraphByMonths = () => {
    const {
        setMounthSelected,
        getHeatSourcesInfoToGragh,
        mounthSelected,
        titleArray,
        countByDates } = useContext(HeatSourcesContext);

    useEffect(() => {
        getHeatSourcesInfoToGragh(mounthSelected);
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

            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Tipo de grafico
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={mounthSelected}
                    onChange={({ target }) => setMounthSelected(
                        parseInt(target.value.toString()))}
                >
                    {meses.map((mes, i) => (
                        <MenuItem
                            key={mes}
                            value={i}>{mes}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {lineGraph ?
                <Line data={data} options={options} />
                :
                <Bar data={data} options={options} />
            }
        </>
    )


}


