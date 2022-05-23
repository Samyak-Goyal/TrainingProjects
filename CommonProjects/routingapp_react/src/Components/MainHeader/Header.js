import styles from './Header.module.css'
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        {/* <Link to="/welcome">Welcome</Link> */}
                        <NavLink to='/welcome' className={(activeValue) =>
                            activeValue.isActive ? styles.active : ""
                        }>Welcome</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product" className={(activeValue) =>
                            activeValue.isActive ? styles.active : ""
                        }>Product</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header