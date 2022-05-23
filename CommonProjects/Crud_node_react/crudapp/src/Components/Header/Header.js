import { Link } from "react-router-dom"

const Header = () => {
    const params = "";
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/list" className="nav-link navbar-item">Crud App</Link>


                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/list" className="nav-link">List User</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create User</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to={`/edit/${params}`} className="nav-link">Edit User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Header;