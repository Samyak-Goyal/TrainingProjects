import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Components/Login/Login";
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListUser from "./Components/User/ListUser";
import AddUser from "./Components/User/AddUser";
import EditUser from "./Components/User/EditUser";
import Header from "./Components/Header/Header"

function App() {
    const { isLogged } = useSelector((state) => state)
    const localdata = localStorage.getItem("token")
    return (
        <div className="container mt-3 mb-3">
            {localdata ? <Header /> : ""}
            {/* <h2>This is CRUD app</h2> */}

            <Routes>
                <Route path="/" element={< Login />} />
                <Route path="/list" element={< ListUser />} />
                <Route path="/create" element={<AddUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
        </div>
    );
}

export default App;
