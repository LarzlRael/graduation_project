import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { DepartamentProvinciaResponse } from '../interfaces/departamensProvincia.interface';
import { useEffect } from 'react';
import { useState } from 'react';
import { CountDepartamentProvinciaResponse } from '../interfaces/countProvinceDepartamento.interface';
import { ChartData } from 'chart.js';


interface GraphProps {
    info?: CountDepartamentProvinciaResponse
}
export const Graficos = ({ info }: GraphProps) => {

    const [stringTitle, setStringTitle] = useState<string[]>(['']);

    function getRandomColor(): string {
        
        const x = Math.floor(Math.random() * 256);
        const y = 100 + Math.floor(Math.random() * 256);
        const z = 50 + Math.floor(Math.random() * 256);
        return `rgb(${x},${y},${z},0.6)`;
    }

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
                label: 'Departamento de La paz',
                data: (info?.resp.map(ele => parseInt(ele.focos_calor))) ? (info?.resp.map(ele => parseInt(ele.focos_calor))) : [],
                backgroundColor: stringTitle.map(random => (
                    getRandomColor()
                )),
                borderColor: stringTitle.map(random => (
                    getRandomColor()
                )),
                borderWidth: 1,
            },
        ],
    };

    const data2 = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const data3 = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <>
            <Doughnut data={data}
            width={400}
            height={400}
            />
            {/* <Line data={data} options={options} />
            <Pie data={data} /> */}
        </>
    )
};



/* select b.nombre_provincia, count(b.nombre_provincia) as focos_calor,sum(count(b.nombre_provincia))
    from fire_history as a
    join provincias as b
    on ST_WITHIN(a.geometry, b.geom)
    where (a.acq_date BETWEEN '2021-09-01'
    and '2021-09-01' and b.departamento in ('Santa Cruz')) GROUP by(b.nombre_provincia) */