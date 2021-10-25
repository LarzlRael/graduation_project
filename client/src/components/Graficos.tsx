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
        countFocos,
        sortInfo,
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
                <>
                    <CircularProgress />
                    
                </>
                :
                graph.info?.resp.length === 0 ?
                    <div>
                        No se encontraron datos
                    </div> :
                    <div className="grafic">
                        <ShowGraphic />
                        <button onClick={() => sortInfo()}>Ordenar</button>
                    </div>
            }
        </>
    )
};
