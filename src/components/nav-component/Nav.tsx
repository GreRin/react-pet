import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Nav.scss';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

function NavMenu(): any {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const theme = useAppSelector((state) => state.theme.theme);
  const { themeHandler } = useActions();

  const logoutHandler = (event: { preventDefault: () => void }): any => {
    event.preventDefault();
    auth.logout(null, null, null, null);
    auth.isAuthenticated = false;
    navigate('/');
  };

  const changeThemeHandler = (): void => {
    themeHandler();
  };

  return (
    <nav
      className={'navbar justify-content-between p-3 ' + (theme ? 'navbar-light bg-light' : 'navbar-light bg-purple')}
    >
      <div>
        <Link className={'navbar__link m-3 ' + (theme ? 'navbar__link-dark' : 'navbar__link-light')} to="/">
          Home
        </Link>
        <Link className={'navbar__link m-3 ' + (theme ? 'navbar__link-dark' : 'navbar__link-light')} to="/links">
          Links
        </Link>
        <Link className={'navbar__link m-3 ' + (theme ? 'navbar__link-dark' : 'navbar__link-light')} to="/favourites">
          Favourites
        </Link>
        <Link className={'navbar__link m-3 ' + (theme ? 'navbar__link-dark' : 'navbar__link-light')} to="/detail">
          Detail
        </Link>
        <Link className={'navbar__link m-3 ' + (theme ? 'navbar__link-dark' : 'navbar__link-light')} to="/pdf">
          Create PDF
        </Link>
      </div>
      <div>
        <Button className={!theme ? 'btn-light' : 'btn-purple'} onClick={changeThemeHandler}>
          Theme
        </Button>
        <Button className="btn-warning ms-3" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </nav>
  );
}

export default NavMenu;
