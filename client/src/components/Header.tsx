import { NavLink } from 'react-router-dom';
export const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <NavLink to='/inicio'>Logo we</NavLink>
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
                {/* <a
                    href="http://localhost:4000/maps"
                    target="_blank"
                    className="link" rel="noreferrer">Mapa de Bolivia</a> */}

                <NavLink
                    activeClassName="active"
                    className="link"
                    to='/departamentos'>
                    Mapa por departamentos 
                </NavLink>
                <NavLink
                    activeClassName="active"
                    className="link"
                    to='/ley1171'>
                    Ley 1171
                </NavLink>

            </div>
        </header>
    )
}
