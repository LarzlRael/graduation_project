import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { accountsLink } from './dataMenu';
import { UpdateInformation } from './dashboard/UpdateInformation';
import { CVSTutorial } from './dashboard/CVSTutorial';

export const AdminDashboard = () => {

    const [openMenu, setOpenMenu] = useState(false);

    // let { image, name } = s_autenticado_admin;
    const handleToogleMenu = () => {
        setOpenMenu(!openMenu);
    }
    return (
        <Router>
            <div className="toolbar">
                <i onClick={handleToogleMenu}
                    className={`${openMenu ?
                        'fa fa-bars'
                        : 'fas fa-arrow-left'} menu-bar`} aria-hidden="true"></i>

                <h4>Panel de administracion</h4>
            </div>
            <div className="dashboard">

                {/* <div className="dash open-menu"> */}

                <div className={`dash ${openMenu ? 'open-menu' : 'close-menu'}`}>

                    <div className="profile-image">
                        <img className="profile-image-img" src="https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg" alt="" />
                        <span className="profile-image-name">Nombre de Usuario</span>
                        {/* <a href="http://localhost:4000/maps">Ir a mapa</a> */}
                    </div>
                    <div className="dash-group">
                        {accountsLink.map((item) => (
                            <div key={uuidv4()}>
                                <span className="title-dash" >
                                    {item.title_group}
                                </span>

                                {item.items.map((link) => (
                                    <NavLink
                                        /*                                         onClick={handleToogleMenu} */
                                        key={uuidv4()}
                                        className="dash-item"
                                        activeClassName="active"
                                        to={link.to}>{link.title}
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>

                    <span className="title-dash">
                        Empleados
                    </span>

                    <div className="dash-group">
                        <ul className="dash-item">Ver empleados</ul>
                        <ul className="dash-item" >Cuentas asociadas</ul>
                        <ul className="dash-item" onClick={() => { }}>Salir</ul>
                    </div>

                </div>
                <div className="dash-content">

                    <Switch>
                        <div className="dashContentContainer">
                            <Route path="/dashboard/actualizar" component={UpdateInformation} />
                            <Route path="/dashboard/tutorial" component={CVSTutorial} />
                        </div>
                        {/*
                            <Route path="/admin/clientes" component={ListClient} /> *

                            {/* <Route path="/admin/vervehiculos" component={VerVehiculos} />

                        <Route path="/admin/ventas" component={AdminVentas} />

                        <Switch>
                            <Route path="/admin/vehiculos" component={Vehiculos} />
                            <Route path="/admin/vehiculos/:id" component={VerVehiculos} />
                        </Switch>
 */}

                    </Switch>

                </div>
            </div>
        </Router>

    )
}
