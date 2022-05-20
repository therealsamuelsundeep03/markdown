import {useState} from "react"
import {GoogleLogin,GoogleLogout} from "react-google-login"; 

function Googlelogin () {
    const [loginButton,setLoginButton] = useState (true);
    const [logoutButton,setlogoutButton] = useState (false);

    const clientId = "1jkjre.apps.googleusercontent.com";

    const loginSuccess = (res) => {
        console.log('login success::', res);
        setLoginButton(false)
        setlogoutButton(true);
        localStorage.setItem("isLoggedIn",true);
        window.location.replace("/home");
    }

    const loginFail = (res) => {
        console.log("login failed::", res)
    } 

    const signOut = () => {
        alert ('Signed Out Successfully');
        setLoginButton(true)
        setlogoutButton(false)
        console.clear();
    }

    return (
        <>
            <div className="googleLogin">
                {loginButton ? 
                    <GoogleLogin
                            clientId = {clientId}
                            buttonText="Login"
                            onSuccess={loginSuccess}
                            onFailure={loginFail}
                            cookiePolicy={'single_host_origin'}
                            className="googlelogin"
                    /> : null}

                {logoutButton ? 
                    <GoogleLogout
                        clientId = {clientId}
                        buttonText="Logout"
                        onLogoutSuccess={signOut} 
                    >
                    </GoogleLogout> : null}
            </div>
        </>
    ) 
}

export default Googlelogin;
