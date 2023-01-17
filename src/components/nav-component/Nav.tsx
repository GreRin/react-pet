import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Nav.scss';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { useHttp } from '../../hooks/http.hook';
import { toast } from 'react-toastify';

function NavMenu(): any {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const theme = useAppSelector((state) => state.theme.theme);
  const { themeHandler } = useActions();
  const { request } = useHttp();

  const logoutHandler = async (event: { preventDefault: () => void }): Promise<any> => {
    const data = await request('/api/logout', 'POST', { userId: auth.userId });
    try {
      event.preventDefault();
      auth.logout(null, null, null, null);
      auth.isAuthenticated = false;
      toast.success(data.message, { position: 'bottom-right' });
      navigate('/');
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    }
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
        <Link className={'navbar__link m-3 ' + (theme ? 'navbar__link-dark' : 'navbar__link-light')} to="/table">
          Table
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
