import { useState, useEffect } from 'react';
import { CircularProgress, Select, MenuItem, TextField } from '@mui/material';
import { FormControl, InputLabel, Grid } from '@material-ui/core';
import { departametsArray } from '../data/data';
import { useDebounceValue } from '../hooks/useDebunceValue';
import { getNombresProvincias, getHottesSourcesByDepartamentProvince, getCountHottesSourcesByDepPro } from '../provider/analysisServices';
import { Resp as ResProvincias } from '../interfaces/provinciasResponse.interface';
import { Graficos } from './Graficos';
import { DepartamentProvinciaResponse } from '../interfaces/departamensProvincia.interface';
import { CountDepartamentProvinciaResponse } from '../interfaces/countProvinceDepartamento.interface';


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
        getProvinciasNamesService()
    }, [departamentoProvincia.departamentSelected]);

    useEffect(() => {
        const getProvinciasNamesService = async () => {
            setLoading(true);
            const depProvList = await getCountHottesSourcesByDepPro({
                dateEnd: '2021-09-01',
                dateStart: '2021-09-01',
                departamento: departamentoProvincia.departamentSelected
            });
            setCountDepProv(depProvList);
            setLoading(false);
        }
        getProvinciasNamesService()
    }, [departamentoProvincia.departamentSelected]);


    const query = async () => {
        const res = await getHottesSourcesByDepartamentProvince({
            dateEnd: '2021-09-01',
            dateStart: '2021-09-01',
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Seleccionar Departamento
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="departamento"
                            label="Age"
                            value={departamentoProvincia.departamentSelected}
                            onChange={(e) => setDepartamentoProvincia({ ...departamentoProvincia, departamentSelected: e.target.value })}
                        >
                            {departametsArray.map((departament) => (
                                <MenuItem
                                    key={departament.name}
                                    value={departament.name}>{departament.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <br />

                        <InputLabel id="demo-simple-select-label">Seleccionar Provincia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="departamento"
                            label="Age"
                            value={departamentoProvincia.provinciaSelected}
                            onChange={(e) => setDepartamentoProvincia({ ...departamentoProvincia, provinciaSelected: e.target.value })}
                        >
                            {arrayToElements.map((departament) => (
                                <MenuItem
                                    key={departament.nombre_provincia}
                                    value={departament.nombre_provincia}>{departament.nombre_provincia}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <button onClick={query}>Consultar we</button>
            <Graficos info={countDepProv} />

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