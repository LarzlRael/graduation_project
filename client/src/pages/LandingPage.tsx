import { Header } from '../components/Header'
import { Switch } from '@mui/material';
import { FormControlLabel } from '@material-ui/core';
import { useTheme } from '../hooks/useTheme';

export const LandingPage = () => {
    const { darkTheme, setTheme } = useTheme();
    return (
        <div className="landingContainer">

            <Header />

            <div className="info">
                <div className="title">
                    <h2>See the world</h2>
                </div>
                <div className="info-container">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus illum labore vitae cumque. Ab ullam officia molestias blanditiis, ex aut quisquam.
                    </span>
                    <a className="buttonMap"
                        href={`${process.env.REACT_APP_SERVER_URL}/maps`} target="_blank" rel="noreferrer">Ir a mapa interactivo</a>
                </div>

                <div className="switchContainer">
                    <FormControlLabel control={
                        <Switch
                            checked={darkTheme}
                            onChange={setTheme}
                        />
                    } label={`${darkTheme ? 'Tema oscuro' : 'Tema Claro'}`} />
                </div>
            </div>
        </div >
    )
}
