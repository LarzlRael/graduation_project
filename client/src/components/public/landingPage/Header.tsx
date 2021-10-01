import { Link } from 'react-router-dom';
export const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>Logo we </Link>
            </div>
            <div className="enlaces">
                <Link to='/reportes'>Reportes y descargas </Link>
                <a href="">Team</a>
                <a href="">Contacts</a>
                <a href="">Issues</a>
                <a href="">Info</a>
            </div>
        </header>
    )
}
