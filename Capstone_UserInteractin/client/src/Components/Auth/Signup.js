import { useNavigate } from "react-router-dom"
import Services from "../../Services/Services"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import './SignIn.css'
import SocialLogin from "./SocialLogin"

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { name, email, password } = useSelector((state) => state)

    const nameChangeHandler = (e) => {
        dispatch({ type: "name", value: e.target.value })
    }

    const emailChangeHandler = (e) => {
        dispatch({ type: "email", value: e.target.value })
    }

    const passwordChangeHandler = (e) => {
        dispatch({ type: "password", value: e.target.value })
    }


    const signupHandler = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            email: email,
            password: password
        }
        Services.signup(data).then((res) => {
            if (res.data !== '') {
                navigate('/signin')
            }

        })

    }
    return (
        <div className="text-center">
            <h1 className='h1margin fw-normal text-white'>Register</h1>
            <main className="form-signin">
                <hr className="" />
                <span className="w-100 btn btn-lg">
                    <button type="submit" className="w-100 btn btn-lg"><SocialLogin /></button>
                </span>
                <div class="_0tv-g">or</div>
                <form onSubmit={signupHandler}>
                    <div className="mb-3 mt-3 form-floating">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            autoComplete="username"
                            onChange={nameChangeHandler} />
                        <label htmlFor="name">Name:</label>

                    </div>
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
                            autoComplete="new-password"
                            onChange={passwordChangeHandler}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="w-100 btn btn-lg btn-danger mb-3">Sign Up</button>
                </form>

                <hr className="my-4" />
                <p className="text-center text-white">
                    Already have an account? {'  '}
                    <a href="/signin" className="text-danger">Sign In</a>
                </p>
            </main>
        </div>
    )
}

export default Signup