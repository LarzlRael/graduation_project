import { useState, useEffect } from 'react';
import { CircularProgress, Select, MenuItem, TextField } from '@mui/material';
import { FormControl, InputLabel, Autocomplete } from '@material-ui/core';
import { departametsArray } from '../data/data';
import { useDebounceValue } from '../hooks/useDebunceValue';
import { getNombresProvincias } from '../provider/analysisServices';
import { Resp as ResProvincias } from '../interfaces/provinciasResponse.interface';


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
            setLoading(false);
        }
        getProvinciasNamesService()
    }, [departamentoProvincia.departamentSelected])

    if (loading) {
        return (
            <CircularProgress />
        );
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
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
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

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
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