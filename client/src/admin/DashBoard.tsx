import React, { useContext, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  RouteComponentProps,
} from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import { accountsLink } from './dataMenu'
import { UpdateInformation } from './dashboard/UpdateInformation'
import { CVSTutorial } from './dashboard/CVSTutorial'
import { AuthAdminContext } from '../context/LoginContext/AuthAdminContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useWindowDimensions } from '../hooks/useWindowsDimentions'
import { useEffect } from 'react'

interface Props extends RouteComponentProps<any> {
  /* Parent component's props*/
}
export const AdminDashboard = (props: RouteComponentProps) => {
  const [openMenu, setOpenMenu] = useState(false)
  const { logOut } = useContext(AuthAdminContext)
  const { windowDimensions } = useWindowDimensions()
  const handleToogleMenu = () => {
    setOpenMenu(!openMenu)
  }
  useEffect(() => {
    if (windowDimensions.width < 768) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  }, [windowDimensions.width])
  useDocumentTitle('dashboard')

  const goToLink = () => {
    if (windowDimensions.width < 768) {
      handleToogleMenu()
    }
  }
  return (
    <Router>
      <div className="toolbar">
        <i
          onClick={handleToogleMenu}
          className={`${
            openMenu ? 'fa fa-bars' : 'fas fa-arrow-left'
          } menu-bar`}
          aria-hidden="true"
        ></i>

        <h4>Panel de administracion</h4>
      </div>
      <div className="dashboard">
        <div className={`dash ${openMenu ? 'open-menu' : 'close-menu'}`}>
          <div className="profile-image">
            <img
              className="profile-image-img"
              src="https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg"
              alt=""
            />
            <span className="profile-image-name">Nombre de Usuario</span>
            {/* <a href="http://localhost:4000/maps">Ir a mapa</a> */}
          </div>
          <div className="dash-group">
            {accountsLink.map((item) => (
              <div key={uuidv4()}>
                <span className="title-dash">{item.title_group}</span>

                {item.items.map((link) => (
                  <NavLink
                    key={uuidv4()}
                    className="dash-item"
                    activeClassName="active"
                    onClick={goToLink}
                    to={link.to}
                  >
                    {link.icon}
                    <span>{link.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          <span className="title-dash">Empleados</span>

          <div className="dash-group">
            <ul className="dash-item">Ver empleados</ul>
            <ul className="dash-item">Cuentas asociadas</ul>
            <ul className="dash-item" onClick={logOut}>
              Salir
            </ul>
          </div>
        </div>
        <div className="dash-content">
          <Switch>
            <div className="dashContentContainer">
              <Route
                path="/dashboard/actualizar"
                component={UpdateInformation}
              />
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
