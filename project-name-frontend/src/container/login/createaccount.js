import { useState } from "react";
import axios from "axios";

import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/createaccount.css";

function CreateAccount() {
    const [num,setNum] = useState("");
    const [error,setError] = useState(false);

    // getting code from the local storage...
    const code = localStorage.getItem("code");


    const handleChange = ({target : {value}}) => {
        setNum(value);
    } 

    const handleSubmit = async(e) => {
        e.preventDefault();
        const code = localStorage.getItem("code");

        // if code is correct then redirect the user to the login page...
        if(code === num){
            const user = localStorage.getItem('user').split(",");
            const newUser = {
                username:user[0],
                email:user[1],
                password:user[2]
            }

            // creating a new user...
            let {data} =await axios.post("https://reactmarkeditor.herokuapp.com/createaccount",newUser);
            alert(data);
            window.location.href = "/login";
        }else{

            // if the code is in correct then send an error message
            setError(true)
        }
    }

    return ( 
        <>
            {/* title */}
            <div className="create-title">
                <FontAwesomeIcon icon={faBoltLightning} className="create-icon"/>
                <h1>Electron</h1>
            </div>

            {/* code verification form */}
            <div className="verify">
                {/* verify the code if the code is correct then add the user to the db and redirect to the login page */}
                <h5>Enter the code sent to your email</h5>
                <form onSubmit={handleSubmit}>
                    {error ? <span style={{color:'red',fontWeight:'600'}}>code doesn't match</span> : ""}
                    <input type="text" className="verifyInp" value={num} onChange={handleChange}/>
                    <button type = "submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default CreateAccount;