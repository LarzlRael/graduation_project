import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AdminLogin } from '../admin/LoginAdmin';
import { AdminDashboard } from '../admin/DashBoard';
import { LandingPage } from '../components/public/landingPage/LandingPage';
import { ReportsLists } from '../components/public/ReportsLists';
import { Ley1171 } from '../components/Ley1171';
import { Departaments } from '../pages/Departaments';
import { PrivateRoute } from './AdminRoutes';
import { AuthAdminContext } from '../context/AuthAdminContext';
import { CircularProgress } from '@material-ui/core';





export const LoadingScreen = () => {
    return (
        <CircularProgress  />
    )
}

export const Navigator = () => {
    /*  const { status } = useContext(AuthAdminContext);
     if (status === 'checking') {
         return <LoadingScreen />
     } */
    return (
        <Router >
            <Switch>

                <Route path="/" exact >
                    <Redirect to='/inicio' />
                </Route>

                <Route path="/inicio" component={LandingPage} />
                <Route path="/login" component={AdminLogin} />
                <Route path="/reportes" component={ReportsLists} />
                <Route path="/ley1171" component={Ley1171} />
                <Route path="/departamentos" component={Departaments} />
                {/* <Route path="/report" component={MyDocument} /> */}
                {/* <Route path="/dashboard" component={AdminDashboard} /> */}

                <PrivateRoute path='/dashboard' component={AdminDashboard} />

                {/* <Redirect from="/*" to="/inicio" /> */}

            </Switch>
        </Router >
    );
}
