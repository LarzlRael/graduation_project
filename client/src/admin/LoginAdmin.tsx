import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthAdminContext } from '../context/AuthAdminContext';
/* import ErrorLabel from '../error-label';
import LoginContext from '../login/LoginContext'; */
/* import { getDates } from '../provider/services';
import { DatesResponse } from '../interfaces/datesResponse';
import { v4 as uuidv4 } from 'uuid'; */
import { useDocumentTitle } from '../hooks/useDocumentTitle';


export const AdminLogin = () => {
    const loginContext = useContext(AuthAdminContext);

    const { singIn, logged } = loginContext;
    const { push } = useHistory();

    useEffect(() => {
        if (logged) {
            push('/dashboard');
        }
        // eslint-disable-next-line
    }, [logged]);

    const [userAdmin, setUserAdmin] = useState({
        email: 'admin@admin.com',
        password: 'Fantasticbaby11xdA'
    });
    //? Error state
    const [Error, setError] = useState({
        error_message: null
    });
    const { error_message } = Error;

    const handleSumbit = (e: any) => {
        e.preventDefault();
        singIn({ username: userAdmin.email, password: userAdmin.password });
    }

    const { email, password } = userAdmin;

    const onChange = (e: any) => {
        setUserAdmin({
            ...userAdmin,
            [e.target.name]: e.target.value
        });
        setError({
            ...Error,
            error_message: null
        })
    }

    useDocumentTitle('Login');

    return (
        <div className="login-div animate__animated animate__fadeIn">
            <div className="form animate__animated animate__fadeInUp">
                <form className="formLogin" onSubmit={handleSumbit}>
                    <h3 className="title ">Login</h3>
                    <input
                        className={error_message ? 'input-login error' : 'input-login'}
                        placeholder="Usuario"
                        onChange={onChange}
                        name="email"
                        value={email}
                        type="text" />
                    <br />
                    <input
                        className={error_message ? 'input-login error' : 'input-login'}
                        placeholder="Contraseña"
                        onChange={onChange}
                        value={password}
                        name="password"
                        type="password" />

                    <button
                        type="submit" className="button-login pointer">
                        Iniciar Sesion
                    </button>

                    {/* {error_message &&
                        <ErrorLabel message={error_message} />} */}
                </form>
            </div>
            <div className="info-login animate__animated animate__fadeInDown">
                <h1>Administrar Cars System</h1>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui ipsam numquam dolore quo, aperiam voluptates labore, error totam rem hic, minus incidunt autem nesciunt ea laborum temporibus enim tempora.</span>
            </div>

        </div >
    )
}

