import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { departametsArray } from '../data/data';
import { useDebounceValue } from '../hooks/useDebunceValue';
import { getNombresProvincias, getHottesSourcesByDepartamentProvince, getCountByDepPro } from '../provider/analysisServices';
import { Resp as ResProvincias } from '../interfaces/provinciasResponse.interface';
import { Graficos } from './Graficos';
import { DepartamentProvinciaResponse } from '../interfaces/departamensProvincia.interface';
import { CountDepartamentProvinciaResponse } from '../interfaces/countProvinceDepartamento.interface';
import { ComboBoxDepartamentos } from './widgets/ComboBoxDepartamentos';
import { DatePickerWidget } from './widgets/DatePickerWidget';


interface SearchProps {
    typo: string,
}
export const SearchProvincias = ({ typo }: SearchProps) => {

    const [termSearch, setTermSearch] = useState('');
    const [arrayToSearch, setArrayToSearch] = useState<ResProvincias[]>([]);
    const [arrayToElements, setArrayToElements] = useState<ResProvincias[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [departamentoProvincia, setDepartamentoProvincia] = useState({
        departamentSelected: departametsArray[0].name,
        provinciaSelected: ''
    });
    const [departamentProvincia, setDepartamentProvincia] = useState<DepartamentProvinciaResponse>();
    const [countDepProv, setCountDepProv] = useState<CountDepartamentProvinciaResponse>({
        ok: false,
        resp: []
    });
    const [dateSelectedStart, setDateSelectedStart] = useState<Date>(new Date());
    const [dateSelectedEnd, setDateSelectedEnd] = useState<Date>(new Date());

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
        getProvinciasNamesService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departamentoProvincia.departamentSelected]);

    useEffect(() => {
        const getProvinciasNamesService = async () => {
            setLoading(true);
            const depProvList = await getCountByDepPro({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
                departamento: departamentoProvincia.departamentSelected
            });
            setCountDepProv(depProvList);
            setLoading(false);
        }
        getProvinciasNamesService();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departamentoProvincia.departamentSelected]);

    const query = async () => {
        const res = await getHottesSourcesByDepartamentProvince({
            dateEnd: dateSelectedStart.toISOString().slice(0, 10),
            dateStart: dateSelectedEnd.toISOString().slice(0, 10),
            departamento: departamentoProvincia.departamentSelected,
            provincia: departamentoProvincia.provinciaSelected,
        });
        setDepartamentProvincia(res);
    }

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

            <button onClick={query}>Consultar we</button>
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