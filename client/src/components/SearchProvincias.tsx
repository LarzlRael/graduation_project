import { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { departametsArray } from '../data/data';
import { useDebounceValue } from '../hooks/useDebunceValue';
import { getNombresProvincias, getCountByDepPro, getCountByDepartamaments } from '../provider/analysisServices';
import { Resp as ResProvincias } from '../interfaces/provinciasResponse.interface';
import { Graficos } from './Graficos';
import { CountDepProMun } from '../interfaces/countProvinceDepartamento.interface';
import { ComboBoxDepartamentos } from './widgets/ComboBoxDepartamentos';
import { DatePickerWidget } from './widgets/DatePickerWidget';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';

interface SearchProps {
    typo: string,
}
export const SearchProvincias = ({ typo }: SearchProps) => {

    const { datesAvailable } = useContext(HeatSourcesContext);


    const [termSearch, setTermSearch] = useState('');
    const [arrayToSearch, setArrayToSearch] = useState<ResProvincias[]>([]);
    const [arrayToElements, setArrayToElements] = useState<ResProvincias[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [departamentoProvincia, setDepartamentoProvincia] = useState({
        departamentSelected: departametsArray[0].name,
        provinciaSelected: '',
        todosDepartamentos: false,
    });

    const [countDepProv, setCountDepProv] = useState<CountDepProMun>({
        ok: false,
        resp: []
    });
    const [dateSelectedStart, setDateSelectedStart] = useState<Date>(datesAvailable[1]);
    const [dateSelectedEnd, setDateSelectedEnd] = useState<Date>(datesAvailable[1]);

    useEffect(() => {

        if (termSearch.length === 0) {
            return setArrayToSearch(arrayToElements);
        }

        if (isNaN(Number(termSearch))) {
            setArrayToSearch(
                arrayToSearch.filter(
                    (elemento) => elemento.nombre_provincia.toLowerCase()
                        .includes(termSearch.toLowerCase())));
        }

    }, [arrayToElements, termSearch]);

    useEffect(() => {
        const getProvinciasNamesService = async () => {
            setLoading(true);
            const provinciasList = await getNombresProvincias(departamentoProvincia.departamentSelected);
            setArrayToElements(provinciasList.resp);
            setDepartamentoProvincia({ ...departamentoProvincia, provinciaSelected: provinciasList.resp[0].nombre_provincia })
            setLoading(false);
        }
        if (!departamentoProvincia.todosDepartamentos) {
            getProvinciasNamesService();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departamentoProvincia.departamentSelected]);

    useEffect(() => {
        const getProvinciasNamesService = async () => {
            setLoading(true);
            const depProvList = await getCountByDepPro({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
                departamento: departamentoProvincia.departamentSelected,
            });
            setCountDepProv(depProvList);
            setLoading(false);
        }
        const getDepartamentosNamesService = async () => {
            setLoading(true);
            const depList = await getCountByDepartamaments({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
            });
            setCountDepProv(depList);
            setLoading(false);
        }
        if (departamentoProvincia.todosDepartamentos) {
            getDepartamentosNamesService();
        } else {
            getProvinciasNamesService();

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departamentoProvincia.departamentSelected]);


    return (
        <div>
            {/* {elementsToSearch} */}
            {/* <SearchInput
                onDebounce={(value) => setTermSearch(value)}
            /> */}
            {/*  <select
                value={deparmentSelected}
                onChange={(e) => SetDeparmentSelected(e.target.value)}
            >
                {departametsArray.map(departament => (
                    <option value={departament.name}>{departament.name}</option>
                ))}

            </select> */}
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <ComboBoxDepartamentos
                        nameDepartament={departamentoProvincia.departamentSelected}
                        setState={setDepartamentoProvincia}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DatePickerWidget
                        state={dateSelectedStart}
                        setDate={setDateSelectedStart}
                        title="Inicio"
                    />
                    <DatePickerWidget
                        state={dateSelectedEnd}
                        setDate={setDateSelectedEnd}
                        title="Fin"
                    />
                </Grid>
            </Grid>

            <Graficos
                info={countDepProv}
                nombreDepartamento={departamentoProvincia.departamentSelected} />

        </div >
    )
}

interface Props {
    onDebounce: (value: string) => void,
}

export const SearchInput = ({ onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');

    const { debouncedValue } = useDebounceValue(textValue, 750);

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue, onDebounce]);

    return (
        <>
            <input type="text"
                placeholder="Buscar elemento"
                autoCapitalize="none"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </>
    );
};