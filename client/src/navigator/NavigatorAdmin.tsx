import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AdminLogin } from '../admin/LoginAdmin';
import { AdminDashboard } from '../admin/DashBoard';
import { ReportsLists } from '../components/public/ReportsLists';


export const Navigator = () => {
    return (
        < Router >
            <Switch>
                <Route path="/login" component={AdminLogin} />
                <Route path="/dashboard" component={AdminDashboard} />
                <Route path="/reportes" component={ReportsLists} />
                {/* <Route path="/report" component={MyDocument} /> */}
            </Switch>
        </Router >
    );
}
