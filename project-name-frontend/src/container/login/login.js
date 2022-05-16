import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";

import Applogin from "../../component/login/applogin";
import "../../css/login.css";


function Login () {
    return (
        <>  
             <div className="logintitle">
                <FontAwesomeIcon icon={faBoltLightning} className="login-icon"/>
                <h1>Electron</h1>
             </div>
            <Applogin />
        </>
    )
}

export default Login