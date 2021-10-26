import { useEffect, useContext } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { getRandomColor } from '../utils/utils';
import { Line } from 'react-chartjs-2';

import { meses } from '../data/data';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import moment from 'moment'
moment.locale('es');

export const SearchMunicipios = () => {
    const { setMounthSelected, getHeatSources, mounthSelected, titleArray, countByDates } = useContext(HeatSourcesContext);


    useEffect(() => {

        getHeatSources(mounthSelected.dateStart, mounthSelected.dateEnd,);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounthSelected.numberMounth]);


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
                text: `Focos de calor en el mes de ${meses[mounthSelected.numberMounth]}`
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
            <select
                value={mounthSelected.numberMounth}
                onChange={(e) => setMounthSelected(parseInt(e.target.value))}
            >
                {meses.map((mes, i) => (
                    <option value={i}>{mes}</option>
                ))}
            </select>
            <Line data={data} options={options} />
        </>
    )


}


