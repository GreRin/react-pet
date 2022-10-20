import { Link } from 'react-router-dom';

function NavMenu(): any {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/links">Links</Link>
      <Link to="/create">Create</Link>
      <Link to="/detail">Detail</Link>
    </nav>
  );
}

export default NavMenu;
