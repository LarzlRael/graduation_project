
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { departametsArray } from '../../data/data';

interface ComboProps {
    nameDepartament: string;
}
export const ComboBoxDepartamentos = ({ nameDepartament }: ComboProps) => {

    const [departament, setDepartament] = useState(nameDepartament);


    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="departamento"
                    label="Age"
                    value={departament}
                    onChange={(e) => setDepartament(e.target.value)}
                >
                    {departametsArray.map((departament) => (
                        <MenuItem
                            key={departament.name}
                            value={departament.name}>{departament.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
