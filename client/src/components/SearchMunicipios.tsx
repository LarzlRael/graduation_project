import { Autocomplete, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { departametsArray } from '../data/data';
import { useDebounceValue } from '../hooks/useDebunceValue';
import { Resp as RespMunicipios } from '../interfaces/municipiosResponse.interface';
import { getNombresMunicipios } from '../provider/analysisServices';

import { CircularProgress, Select, MenuItem, TextField } from '@mui/material';
import { FormControl, InputLabel } from '@material-ui/core';
import { Graficos } from './Graficos';

interface SearchProps {
    typo: string,
}
export const SearchMunicipios = ({ typo }: SearchProps) => {

    const [termSearch, setTermSearch] = useState('');
    const [arrayToSearch, setArrayToSearch] = useState<RespMunicipios[]>([]);
    const [arrayToElements, setArrayToElements] = useState<RespMunicipios[]>([]);
    const [departamentoMunicipio, setDepartamentoMunicipio] = useState({
        departamentSelected: departametsArray[0].name,
        municipioSelected: ''
    });
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {

        if (termSearch.length === 0) {
            return setArrayToSearch(arrayToElements);
        }

        if (isNaN(Number(termSearch))) {

            setArrayToSearch(
                arrayToSearch.filter(
                    (elemento) => elemento.nombre_municipio.toLowerCase()
                        .includes(termSearch.toLowerCase())));
        }

    }, [arrayToElements, termSearch]);

    useEffect(() => {
        const getMunicipiosNames = async () => {
            setLoading(true);
            const provinciasList = await getNombresMunicipios(departamentoMunicipio.departamentSelected);
            setArrayToElements(provinciasList.resp);
            setDepartamentoMunicipio({ ...departamentoMunicipio, municipioSelected: provinciasList.resp[0].nombre_municipio })
            setLoading(false);
        }
        getMunicipiosNames()
    }, [departamentoMunicipio.departamentSelected]);

    /*  if (loading) {
         return (
             <CircularProgress />
         );
     } */

    return (
        <div>
            {/* {elementsToSearch} */}
            {/* <SearchInput
                onDebounce={(value) => setTermSearch(value)}
            /> */}
            {/*  <select
                value={deparmentSelected}
                onChange={(e) => setDeparmentSelected(e.target.value)}
            >
                {departametsArray.map(departament => (
                    <option value={departament.name}>{departament.name}</option>
                ))}

            </select> */}
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <br />

                        <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="departamento"
                            label="Age"
                            value={departamentoMunicipio.departamentSelected}
                            onChange={(e) => setDepartamentoMunicipio({ ...departamentoMunicipio, departamentSelected: e.target.value })}
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
                        <br />
                        <InputLabel id="demo-simple-select-label">
                            Seleccionar Municipioo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="departamento"
                            label="Age"
                            value={departamentoMunicipio.municipioSelected}
                            onChange={(e) => setDepartamentoMunicipio({ ...departamentoMunicipio, municipioSelected: e.target.value })}
                        >
                            {arrayToElements.map((departament) => (
                                <MenuItem
                                    key={departament.nombre_municipio}
                                    value={departament.nombre_municipio}>{departament.nombre_municipio}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            <Graficos />
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