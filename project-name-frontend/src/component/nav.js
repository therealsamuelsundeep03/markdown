import { Button } from "react-bootstrap";
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoltLightning} from "@fortawesome/free-solid-svg-icons";

import "../css/nav.css";

function Nav(){

    const username = localStorage.getItem('username');

    // removing email and login status and redirecting the user to the login page...
    const signOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = "/login";
    }

    return (
       <>
            <div className="nav">
                <div className="title">
                    <FontAwesomeIcon icon={faBoltLightning} className="icon"/>
                    <h3 >Electron</h3>
                </div>
                <div className="navItems">
                    <ul>
                        <li>{username ? `Hi ${username} !` : "Happy Coding !!"}</li>
                        <li onClick={()=>{window.location.href="/home"}}>Home</li>
                        <li onClick={()=>{window.location.href="/saved"}}>Saved</li>
                        <li><Button variant={"primary"} onClick={signOut}>Sign out</Button></li>
                    </ul>
                </div>
            </div>
            
       </>
    )
}

export default Nav;