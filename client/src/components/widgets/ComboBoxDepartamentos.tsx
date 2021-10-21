import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { departametsArray } from '../../data/data';

interface ComboProps {
    setState: React.Dispatch<React.SetStateAction<{
        departamentSelected: string;
        provinciaSelected: string;
    }>>;
    nameDepartament: string;
    
}
export const ComboBoxDepartamentos = ({ nameDepartament, setState }: ComboProps) => {

    /* setDepartamentoProvincia({ ...departamentoProvincia, departamentSelected: e.target.value }) */
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="departamento"
                    label="Age"
                    value={nameDepartament}
                    onChange={(e) => setState(previosState => ({ ...previosState, departamentSelected: e.target.value }))}
                >
                    {departametsArray.map((departament) => (
                        <MenuItem
                            key={departament.name}
                            value={departament.name}>{departament.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div >
    )
}
