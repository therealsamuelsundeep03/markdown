import { useState } from "react";
import {Form} from "react-bootstrap";
import axios from "axios";
import Googlelogin from "./googlelogin";

function Applogin () {
    const [credentials,setCredentials] = useState ({
        email : "",
        password : "",
        errors:{
            email : "",
            password : ""
        }
    })

    // once the new user is verified/signed up then they are redirected to the login page
    // then delete the code and user credentials from the local storage...

    const user = localStorage.getItem('user');
    const code = localStorage.getItem('code');
    if(user){
        localStorage.removeItem('user');
    }else if(code){
        localStorage.removeItem('code');
    }


    // handling validations
    const handleChange = ({target : {name,value}}) => {
        const errors = credentials.errors;
        switch(name){
            case "email":
            errors.email = !value ?  "Enter an email" : "";
            break;
            case "password": {
                if(!value){
                    errors.password = "Enter a password";
                }else{
                    errors.password = "";
                }
            }
            break;
            default : break;
        }
        setCredentials({...credentials,[name]:value},errors)
    }

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();

            // send the credentials to the backend...
            const credential = {
                email:credentials.email,
                password:credentials.password
            }
            const errors = credentials.errors
            let response = await axios.post("https://reactmarkeditor.herokuapp.com/login",credential);
            // console.log(response.data);

            // if email doesnt not exist in the database then send message 
            // stating that email doesn't exists

            if(response.data == "Email doesnt exists"){
                errors.email = "email doesn't exists";
            }else if(response.data == "password is incorrect"){

                // if the password doesnt matches with the one stored in the database
                // then send message stating that the password doesn't match..

                errors.password = "password is incorrect";
            }else if(Object.keys(response.data).includes("UserExists")){

                // if the user credintails are correct then redirect the user to the home page
                // store the user name and logged in status for further purposes...
               
                const user = response.data.UserExists.split(",");
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem('username',user[0]);
                localStorage.setItem('email',user[1]);
                window.location.href="/home";
            }
            setCredentials({...credentials,errors})
        }
        catch(err){
            console.log(err)
        }

    }

    return (
        <>  
            <div className="appLogin" style={{width:'22rem'}}>
                <h2>Sign-In</h2>

                {/* user form */}
                <Form 
                    className="form" 
                    onSubmit={handleSubmit}
                    >
                        <div className="email ">
                            <label>Email</label>
                            <span className="errmessg" >{credentials.errors.email}</span>
                            <input type={"email"} className="form-control" name="email" value={credentials.email} onChange = {handleChange}/>
                        </div>
                        <div className="password">
                            <label>Password</label>
                            <span className="errmessg" >{credentials.errors.password}</span>
                            <input type={"password"} className="form-control" name="password" value={credentials.password} onChange = {handleChange}/>
                        </div>
                        <div>
                            <button type = "submit" className="btn btn-primary signIn" >Sign In</button>
                        </div>
                </Form>

                {/* if user want to sign up then redirect them to the verify page */}
                <div className="create">
                    <span className="newhere">New here ? </span>
                    <span className="signup"><a href="/verify">signup</a></span>
                </div>
                <hr />

                {/* user google login */}
                <Googlelogin />
            </div>
        </>
    )
}

export default Applogin;
