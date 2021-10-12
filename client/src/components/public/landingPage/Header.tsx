import { NavLink } from 'react-router-dom';
export const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <NavLink to='/inicio'>Logo we </NavLink>
            </div>
            <div className="enlaces">
                <NavLink
                    activeClassName="active"
                    className="link"
                    to='/inicio'>Inicio
                </NavLink>
                <NavLink
                    activeClassName="active"
                    className="link"
                    to='/reportes'>Reportes y descargas
                </NavLink>
                <a
                    href="http://localhost:4000/maps"
                    target="_blank"
                    className="link" rel="noreferrer">Ir a mapa interactivo</a>

                <NavLink
                    activeClassName="active"
                    className="link"
                    to='/ley1171'>
                    Ley 1171
                </NavLink>
                <NavLink
                    activeClassName="active"
                    className="link"
                    to='/departamentos'>
                    Departamentos
                </NavLink>

            </div>
        </header>
    )
}
