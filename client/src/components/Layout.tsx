import { Header } from './Header';
import { useContext } from 'react';
import { AuthAdminContext } from '../context/AuthAdminContext';

interface LayoutProps { children: any }
export const Layout = ({ children }: LayoutProps) => {
    const { darkTheme } = useContext(AuthAdminContext);
    return (
        <div className={`layout_page ${darkTheme && 'darkTheme'}`}>
            <Header />
            {children}
        </div>
    )
}
