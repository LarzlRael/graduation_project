import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AdminLogin } from '../admin/LoginAdmin';
import { AdminDashboard } from '../admin/DashBoard';
import { LandingPage } from '../components/public/landingPage/LandingPage';
import { ReportsLists } from '../components/public/ReportsLists';
import { Ley1171 } from '../components/Ley1171';


export const Navigator = () => {
    return (
        < Router >
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" exact component={AdminLogin} />
                <Route path="/dashboard" exact component={AdminDashboard} />
                <Route path="/reportes" exact component={ReportsLists} />
                <Route path="/ley1171" exact component={Ley1171} />
                {/* <Route path="/report" component={MyDocument} /> */}
            </Switch>
        </Router >
    );
}
