import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { DepartamentProvinciaResponse } from '../interfaces/departamensProvincia.interface';
import { useEffect } from 'react';
import { useState } from 'react';
import { CountDepartamentProvinciaResponse } from '../interfaces/countProvinceDepartamento.interface';
import { ChartData, ChartOptions } from 'chart.js';
import { getRandomColor } from '../utils/utils';


interface GraphProps {
    info?: CountDepartamentProvinciaResponse,
    nombreDepartamento: string;
}
export const Graficos = ({ info, nombreDepartamento }: GraphProps) => {

    const graphType = [
        'pie',
        'line',
        'barVertical',
        'barHorizontal'];

    const [stringTitle, setStringTitle] = useState<string[]>(['']);
    const [graphic, setGraphic] = useState<string>(graphType[0]);

    useEffect(() => {
        const titlesArray: string[] = [];
        info?.resp.map(res => (
            titlesArray.push(res.nombre_provincia)
        ));
        const arrayTitles: string[] = [];
        info?.resp.map(resp => (arrayTitles.push(resp.nombre_provincia)))

        setStringTitle(arrayTitles);

    }, [info])

    const data: ChartData = {
        labels: stringTitle,
        datasets: [
            {
                label: `Departamento de ${nombreDepartamento}`,
                data: (info?.resp.map(ele => parseInt(ele.focos_calor))) ? (info?.resp.map(ele => parseInt(ele.focos_calor))) : [],
                backgroundColor: stringTitle.map(() => (
                    getRandomColor()
                )),
                borderColor: stringTitle.map(() => (
                    getRandomColor()
                )),
                borderWidth: 1,
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
                text: `Consultas del departamento de ${nombreDepartamento}`
            }
        }
    };
    const options2: ChartOptions = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    const ShowGraphic = () => {
        switch (graphic) {
            case 'pie':
                return <Pie data={data} />
            case 'line':
                return <Line data={data} options={options} />
            case 'barHorizontal':
                return <Bar data={data} options={options} />
            case 'barVertical':
                return <Bar data={data} options={options2} />
            default:
                return <Pie data={data} />
        }

    }

    return (
        <>
            <select
                onChange={(e) => setGraphic(e.target.value)}
            >
                {graphType.map(graph => (
                    <option value={graph}>{graph}</option>
                ))}
            </select>
            <ShowGraphic />

        </>
    )
};



/* select b.nombre_provincia, count(b.nombre_provincia) as focos_calor,sum(count(b.nombre_provincia))
    from fire_history as a
    join provincias as b
    on ST_WITHIN(a.geometry, b.geom)
    where (a.acq_date BETWEEN '2021-09-01'
    and '2021-09-01' and b.departamento in ('Santa Cruz')) GROUP by(b.nombre_provincia) */