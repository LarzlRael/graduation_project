import { CountDepProMun } from '../interfaces/countProvinceDepartamento.interface';
import { CircularProgress } from '@material-ui/core';
import { useGraficos } from '../hooks/useGraficos';

export interface GraphProps {
    info?: CountDepProMun,
    nombreDepartamento: string;
    loading: boolean;
}
export const Graficos = (graphProps: GraphProps) => {

    const {
        changeTypeGraph,
        ShowGraphic,
        graphType,
        graphTypeArray,
    } = useGraficos(graphProps);

    const { loading, info } = graphProps;

    return (
        <>
            <select
                value={graphType}
                onChange={(e) => changeTypeGraph(e.target.value)}
            >
                {graphTypeArray.map(graph => (
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
