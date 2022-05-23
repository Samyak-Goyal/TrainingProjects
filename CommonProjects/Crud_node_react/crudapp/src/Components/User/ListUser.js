import { useEffect } from 'react'
import UserService from "../../Services/UserService"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ListUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserData = () => {
        UserService.getUser().then((res) => {
            console.log(res.data)
            dispatch({ type: "users", value: res.data })
        })
    }
    useEffect(() => {
        // UserService.getUser().then((res) => {
        //     console.log(res.data)
        //     dispatch({ type: "users", value: res.data })
        // })
        getUserData()
    }, [])

    const { email, users } = useSelector(state => state)
    
    //console.log(email)

    const editHandler =(id) =>{
        localStorage.setItem("id", id)
    }
    const deleteHandler = (id) => {
        UserService.deleteUser(id).then((res) => {
            getUserData()
        })
    }

    return (
        <div className='container'>
            <table className='table table-striped mt-3 align-middle text-center'>
                <thead>
                    <tr>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Link to={`/edit/${user._id}`} className='btn btn-warning m-1' onClick={() => editHandler(user._id)}>Edit</Link>
                                <button type="button" className='btn btn-danger m-1' onClick={() => deleteHandler(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListUser