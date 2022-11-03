import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Nav.scss';

function NavMenu(): any {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = (event: { preventDefault: () => void }): any => {
    event.preventDefault();
    auth.logout(null, null, null, null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link className="navbar__link m-3" to="/">
        Home
      </Link>
      <Link className="navbar__link m-3" to="/links">
        Links
      </Link>
      <Link className="navbar__link m-3" to="/favourites">
        Favourites
      </Link>
      <Link className="navbar__link ye m-3" to="/detail">
        Detail
      </Link>
      <Button className="btn-warning" onClick={logoutHandler}>
        Log Out
      </Button>
    </nav>
  );
}

export default NavMenu;
