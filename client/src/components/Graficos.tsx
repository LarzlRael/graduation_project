import { CountDepProMun } from '../interfaces/countProvinceDepartamento.interface';
import { CircularProgress } from '@material-ui/core';
import { useGraficos } from '../hooks/useGraficos';

export interface GraphProps {
    info?: CountDepProMun,
    nombreDepartamento: string;
    loading: boolean;
}
export const Graficos = (graph: GraphProps) => {

    const {
        setGraphic,
        ShowGraphic,
        loading,
        graphType,
        info
    } = useGraficos(graph);

    return (
        <>
            <select
                onChange={(e) => setGraphic(e.target.value)}
            >
                {graphType.map(graph => (
                    <option value={graph}>{graph}</option>
                ))}
            </select>
            {loading ?
                <CircularProgress />
                :
                info?.resp.length === 0 ?
                    <div>
                        No se encontraron datos
                    </div> :
                    <div className="grafic">
                        <ShowGraphic />

                    </div>
            }
        </>
    )
};



/* select b.nombre_provincia, count(b.nombre_provincia) as focos_calor,sum(count(b.nombre_provincia))
    from fire_history as a
    join provincias as b
    on ST_WITHIN(a.geometry, b.geom)
    where (a.acq_date BETWEEN '2021-09-01'
    and '2021-09-01' and b.departamento in ('Santa Cruz')) GROUP by(b.nombre_provincia) */