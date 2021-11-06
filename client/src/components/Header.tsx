
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

export const Header = () => {
    const [openMenu, setShowMenu] = useState(true);
    return (
        <header className="header">
            <div className="logo">
                <NavLink to='/inicio'>Logo we</NavLink>
                <IoMenu color="#fff"
                    onClick={() => {
                        console.log('change')
                        setShowMenu(!openMenu)
                    }}
                    fontSize={40} />
            </div>
            <div className={`enlaces ${openMenu ? 'openMenu' : 'closeMenu'}`}>
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
