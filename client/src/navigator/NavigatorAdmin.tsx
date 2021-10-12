import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AdminLogin } from '../admin/LoginAdmin';
import { AdminDashboard } from '../admin/DashBoard';
import { LandingPage } from '../components/public/landingPage/LandingPage';
import { ReportsLists } from '../components/public/ReportsLists';
import { Ley1171 } from '../components/Ley1171';
import { Departaments } from '../pages/Departaments';


export const Navigator = () => {
    return (
        < Router >
            <Switch>
                
                <Route path="/inicio" component={LandingPage} />
                <Route path="/login" component={AdminLogin} />
                <Route path="/dashboard" component={AdminDashboard} />
                <Route path="/reportes" component={ReportsLists} />
                <Route path="/ley1171" component={Ley1171} />
                <Route path="/departamentos" component={Departaments} />
                <Redirect from="/*" to="/inicio"/>
                {/* <Route path="/report" component={MyDocument} /> */}
            </Switch>
        </Router >
    );
}
