import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { Fragment, useReducer } from "react";
const Welcome = () => {
    const navigate = useNavigate()

    const [state,dispatch] = useReducer()

    const buttonClickHandler = () => {
        navigate("/product")
    }

    return (
        <Fragment>
            <h1>This is Welcome Page!</h1>
            <Link to='guest-user'>Guest user</Link>
            <Outlet />
            {/* <Routes>
                <Route path="guest-user" element={<p>hi</p>}/>
            </Routes> */}
            <button onClick={buttonClickHandler}>Visit Products</button>
            {/* <Link to="/product"> <button onClick={buttonClickHandler}>Visit Products</button></Link> */}
        </Fragment>
    )
}

export default Welcome