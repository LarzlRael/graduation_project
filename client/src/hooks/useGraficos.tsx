import { useEffect, useState } from 'react';
import { getRandomColor } from '../utils/utils';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { GraphProps } from '../components/Graficos';


export const useGraficos = ({ info, nombreDepartamento, loading }: GraphProps) => {

    const graphType = [
        'barVertical',
        'barHorizontal',
        'pie',
        'line',
        'doughnut',
    ];
    
    const [stringTitle, setStringTitle] = useState<string[]>(['']);
    const [graphic, setGraphic] = useState<string>(graphType[0]);

    useEffect(() => {
        const titlesArray: string[] = [];
        info?.resp.map(resp => (
            titlesArray.push(resp.nombre)
        ));
        const arrayTitles: string[] = [];
        info?.resp.map(resp => (arrayTitles.push(resp.nombre)))

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
            case 'doughnut':
                return <Doughnut data={data} options={options} />
            default:
                return <Pie data={data} />
        }
    }

    return {
        setGraphic,
        ShowGraphic,
        loading,
        graphType,
        info
    };
};
