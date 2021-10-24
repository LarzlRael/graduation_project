import { FormControlLabel } from '@material-ui/core'
import { Switch } from '@mui/material'
import { useContext } from 'react';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';


export const SwitchWidget = () => {
    const { showProvinvicaMun, showProvMun } = useContext(HeatSourcesContext);
    console.log('estado del state: ' + showProvMun);
    return (
        <FormControlLabel control={
            <Switch
                checked={showProvMun}
                onChange={(e) => showProvinvicaMun(e.target.checked)}
            />
        } label={`Buscar por ${showProvMun ? 'Provincia' : 'Municipio'}`} />
    )
}

