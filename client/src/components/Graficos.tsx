import { CountDepProMun } from '../interfaces/countProvinceDepartamento.interface';
import { CircularProgress } from '@material-ui/core';
import { useGraficos } from '../hooks/useGraficos';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
        tipoGrafico,
    } = useGraficos(graphProps);

    const { loading, info } = graphProps;

    return (
        <>
            {/* <select
                value={graphType}
                onChange={(e) => changeTypeGraph(e.target.value)}
            >
                {graphTypeArray.map(graph => (
                    <option
                        key={graph}
                        value={graph}>{graph}</option>
                ))}
            </select> */}
            <br />
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Tipo de grafico
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    renderValue={(value) => `${graphType}`}
                    value={graphType}
                    onChange={({target}) => changeTypeGraph(target.value)}
                >
                    {graphTypeArray.map((graph) => (
                        <MenuItem
                            key={graph}
                            value={graph}>{graph}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading ?
                <>
                    <CircularProgress />

                </>
                :
                info?.resp.length === 0 ?
                    <div>
                        No se encontraron datos
                    </div> :
                    <div className={`${tipoGrafico === 'circular' && 'grafic-circle' }`}>
                        <ShowGraphic />
                    </div>
            }
        </>
    )
};
