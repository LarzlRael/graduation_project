
import { useEffect, useContext } from 'react';
import tokenAuth from '../utils/token_auth';
import { AuthAdminContext } from '../context/AuthAdminContext';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: any;
}

const token = localStorage.getItem('token');

if (token) {
    tokenAuth(token);
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const { logged, checkToken } = useContext(AuthAdminContext);

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line
    }, []);

    return (
        <Route
            {...rest}
            render={(routeProps) => logged ?
                <Component {...routeProps} /> :
                <Redirect to='/login' />

            }
        />
    );
};