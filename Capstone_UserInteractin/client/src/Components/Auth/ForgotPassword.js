import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import Services from "../../Services/Services"
import { useState } from "react"

const ForgotPassword = () => {
    // const [email, setEmail] = useState()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const { email} = useSelector((state) => state)

    const emailChangeHandler=(e)=>{
        dispatch({type: "email", value: e.target.value})
        setMessage('')
        setError('')
    }

    const forgotpassword=(e)=>{
        e.preventDefault()
        setMessage('')
        setError('')
        Services.forgotpassword(JSON.stringify({ email })).then((res)=>{
            try{
                console.log(res.message)
                setMessage(res.message)
            }catch{
                console.log(res.error)
                setError(res.error)
            }
        })
    }
    return (
        <div className="container" style={{ height: "calc(100vh - 200px)" }}>
            <h2 className="mt-5 mb-5">Please type your email for password reset link</h2>

            {message && (
                <h4 className="bg-success"></h4>
            )}
            {error && (
                <h4 className="bg-warning"></h4>
            )}

            <form>
                <div className="form-group mt-5">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                        // value={email}
                        name="email"
                        onChange={emailChangeHandler}
                        autoFocus
                    />
                </div>
                <button
                    onClick={forgotpassword}
                    className="btn btn-raised btn-primary"
                >
                    Send Password Resest Link
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword