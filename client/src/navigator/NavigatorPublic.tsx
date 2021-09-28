import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AdminLogin } from '../admin/LoginAdmin';
import { AdminDashboard } from '../admin/DashBoard';
import { ConsultByDate } from '../components/public/ConsultByDate';


export const Navigator = () => {
    return (
        < Router >
            <Switch>
                <Route path="/reportes" component={ConsultByDate} />
            </Switch>
        </Router >
    );
}
