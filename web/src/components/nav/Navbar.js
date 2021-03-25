import { useContext, Fragment } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo-ih.svg';
import { logout } from '../../services/users-service';
import { AuthContext } from '../../contexts/AuthStore';

function Navbar() {
  const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
  const history = useHistory();

  async function handleLogout() {
    await logout();
    onUserChange(undefined);
    history.push('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/events">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-middle" />
          Iron Events
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/events">Events</NavLink></li>
          </ul>
          <ul className="navbar-nav d-flex">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink></li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><Link className="nav-link text-light" to="/create-event"><i className="fa fa-plus" /></Link></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/profile">{user.email}</NavLink></li>
                <li className="nav-item"><button type="submit" className="btn btn-link link-unstyled text-light" onClick={handleLogout}><i className="fa fa-sign-out" ></i></button></li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
