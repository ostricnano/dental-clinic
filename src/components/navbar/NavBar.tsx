import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/'
    }

    return(
        <div className="navbar">
            <Link className='link' to='/home'><h3 className='logo'>Dental | Clinic</h3></Link>
            <div className='links'>
                <Link className='link' to='/dentists'>Dentists</Link>
                <Link className='link' to='/clients'>Clientes</Link>
                <Link className='link' to='/appointments'>Appointments</Link>
            </div>
            <button className="navButton" onClick={logOut}>Log out</button>
        </div>
    )
}
export default NavBar