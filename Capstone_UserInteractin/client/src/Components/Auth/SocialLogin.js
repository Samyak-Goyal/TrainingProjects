import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import refreshTokenSetup from '../../utils/refreshTokenSetup';
import Services from '../../Services/Services';
// or
// import { GoogleLogin } from 'react-google-login';

const SocialLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSuccess = (response) => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        Services.sociallogin(user).then((res) => {
            if (res.data !== '') {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("chat-app-current-user", JSON.stringify(res.data.user))
                dispatch({ type: "logged", value: true })
                navigate("/list")

            }
            else {
                dispatch({ type: "logged", value: false })
            }
        })
        refreshTokenSetup(response)
    }

    const onFailure = (res) => {
        console.log('Login failed res:', res)
    }

    return (
        <div>
            <GoogleLogin
                clientId="758701250356-ut77tpqko0umblc2vuih6qoiq120plbt.apps.googleusercontent.com"
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                // isSignedIn={true}
            />,
        </div>
    );
}


export default SocialLogin