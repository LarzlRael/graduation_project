import { FormControlLabel } from '@material-ui/core';
import { Switch } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';
export const SwitchTheme = () => {
    const { darkTheme, setTheme } = useTheme();
    return (
        <div>
             <div className="switchContainer">
                    <FormControlLabel control={
                        <Switch
                            checked={darkTheme}
                            onChange={setTheme}
                            color='primary'
                        />
                    } label={`${darkTheme ? 'Tema oscuro' : 'Tema Claro'}`} />
                </div>
        </div>
    )
}
