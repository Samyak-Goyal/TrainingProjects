import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import './Header.css'
import { useState } from "react"
import { useEffect } from "react"

const Header = (props) => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const chatHandler = () => {
        navigate('/chat')
    }
    const homeHandler = () => {
        navigate('/list')
    }
    const addPost=()=>{
        navigate('/add-post')
    }
    useEffect(() => {
        (async () => {
            const data = await JSON.parse(
                localStorage.getItem('chat-app-current-user')
            );
            setName(data.name);
        })()
    }, []);
    return (

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-danger" >
            <div class="container-fluid">
                <a class="navbar-brand" onClick={homeHandler}>UserInteraction</a>
                {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                
                    <ul class="navbar-nav me-auto mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" onClick={homeHandler}>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" onClick={addPost}>Add Post</a>
                        </li>
                        <li class="nav-item">

                            <a class="nav-link active" onClick={chatHandler}>Chat</a>
                        </li>
                    </ul>
                    <div><span class="navbar-text" style={{color:'white',}}>
                        Hi <strong>{name}</strong> &nbsp;
                        &nbsp;  
                    </span></div>
                
                    <button class="btn btn-danger" onClick={props.onLogoutClick}> Logout</button>

                
            </div>
        </nav>

    )
}

export default Header