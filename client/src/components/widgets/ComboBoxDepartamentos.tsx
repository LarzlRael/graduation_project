import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { departametsArray } from '../../data/data';

interface ComboProps {
    setState: React.Dispatch<React.SetStateAction<{
        departamentSelected: string;
        provinciaSelected: string;
        todosDepartamentos: boolean;
    }>>;
    nameDepartament: string;

}
export const ComboBoxDepartamentos = ({ nameDepartament, setState }: ComboProps) => {
    return (

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                Seleccionar Departamento
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={nameDepartament}
                onChange={(e) => setState(previosState => ({
                    ...previosState,
                    departamentSelected: e.target.value,
                    todosDepartamentos: e.target.value === 'Bolivia' ? true : false
                }))}
            >
                <MenuItem
                    key="Bolivia"
                    value="Bolivia">Bolivia</MenuItem>
                {departametsArray.map((departament) => (
                    <MenuItem
                        key={departament.name}
                        value={departament.name}>{departament.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    )
}
