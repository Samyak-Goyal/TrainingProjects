import { useDispatch, useSelector } from 'react-redux'
import Service from '../../Services/Services'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import SocialLogin from "./SocialLogin"
import { Link } from 'react-router-dom'
import './SignIn.css'

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email, password, isLogged } = useSelector((state) => state)
    useEffect(() => {
        
        const localData = localStorage.getItem("token")
        if (localData) {
            navigate("/list")
        }
        // navigate('/signin')

    }, [])

    const emailChangeHandler = (event) => {
        dispatch({ type: 'email', value: event.target.value })
    }
    const passwordChangeHandler = (e) => {
        dispatch({ type: 'password', value: e.target.value })
    }
    const loginHandler = (event) => {
        event.preventDefault()

        Service.signin({ "email": email, "password": password })
            .then((res) => {
                try {
                    
                    if (res.data!=='' && res.data.status === true) {
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("chat-app-current-user", JSON.stringify(res.data.user))
                        const localdata= localStorage.getItem("chat-app-current-user")
                        console.log(localdata.name)
                        dispatch({ type: "logged", value: true })
                        navigate("/list")

                    }
                    else{
                        
                        console.log(res.data.msg)
                        dispatch({ type: "logged", value: false })
                    }
                } catch {
                    
                    console.log(res.data.error)
                }

            })
    }

    return (
        <div className="text-center">
            <h1 className='h1margin mt-3 mb-3 fw-normal text-white'>Log In</h1>
            <main className="form-signin">
                {isLogged === false ?
                    (<div className="alert alert-danger">
                        <strong>Error: </strong>Login Credentials Failed
                    </div>)
                    : ("")}
                <form onSubmit={loginHandler}>
                    <div className="mb-3 mt-3 form-floating">

                        <input type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email"
                            autoComplete="username"
                            onChange={emailChangeHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="mb-3 mt-3 form-floating">

                        <input type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control"
                            autoComplete='current-password'
                            onChange={passwordChangeHandler}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="w-100 btn btn-lg btn-danger mb-3">Login</button>
                    <br />
                    <div>
                        <Link to="/forgot-password" className="text-danger">
                            {/* {" "} */}
                            Forgot Password
                        </Link>
                    </div>
                    <br />
                    <div class="_0tv-g">or</div>

                    <div class="qF0y9 Igw0E IwRSH eGOV_ acqo5 _4EzTm bkEs3 CovQj jKUp7  DhRcB">
                        <button type="submit" className="w-100 btn btn-lg"><SocialLogin /></button>
                    </div>



                    {/* <br />
                    <br /><SocialLogin /> */}
                </form>
                <hr className="my-4" />
                <p className="text-center text-white">
                    Don't have an account?<a href="/signup" className='text-danger'> SignUp</a>
                </p>
            </main>
        </div>
    )
}

export default SignIn