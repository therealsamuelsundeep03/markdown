import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";

import FormInput from "../../component/login/forminp";
import "../../css/verify.css";

function Verification () {
    const [user,setUser] = useState({
        username : "",
        email : "",
        password : "",
        confirmpassword : "",
        errors:{
            username : "",
            email : "",
            password : "",
            confirmpassword : ""
        }
        }
    );

    const [verify,setVerify] = useState(false);
    const [code,setCode] = useState("");


    // user input
    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"username",
            label:"username",
        },
        {
            id:2,
            name:"email",
            type:"email",
            placeholder:"Email",
            label:"Email",
        },
        {
            id:3,
            name:"password",
            type:"password",
            placeholder:"password",
            label:"Password",
        },
        {
            id:4,
            name:"confirmpassword",
            type:"password",
            placeholder:"confirmpassword",
            label:"Confirm Password",
        },
    ]

    const handleChange = ({target  : {name,value}}) => {
        const errors = user.errors;

        // adding validations to the form
        switch (name) {
            case "username": {
                if(!value){
                    errors.username = "please enter the username";
                }else if(value.length < 5){
                    errors.username = "username must be atleat 5 characters";
                }else{
                    errors.username = "";
                }
            }
            break;
            case "email":
            errors.email = !value ?  "please enter valid email" : "";
            break;
            case "password": {
                if(!value){
                    errors.password = "please enter the password";
                }else if(value.length < 8){
                    errors.password = "password must be atleat 8 characters";
                }else{
                    errors.password = "";
                }
            }
            break;
            case "confirmpassword": {
                if(value != user.password){
                    errors.confirmpassword = "password do not match"
                }else {
                    errors.confirmpassword = ""
                }
                break;
            }

            default:
                break;
        }
        setUser({...user,[name]:value},errors)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = Object.values(user.errors).filter((err)=>{
            return err !== "";
        });
        if(!errors.length ){
            const newUser = {
                username : user.username,
                email : user.email,
                password : user.password,
            }
            localStorage.setItem("user",`${user.username},${user.email},${user.password}`);
            try{
                // sending the credentials to the backend

                let response = await axios.post("https://reactmarkeditor.herokuapp.com/verify",newUser);

                if(response.data == "fill all the inputs"){

                    // if feilds are empty then send a err messg
                    const error = user.errors;
                    error.username = "fill all the inputs";
                    setUser({...user,errors});
                }else if(response.data.response == "Email sent"){

                    // if all the validations are correct then redirect  the user to the create page...
                    const code = response.data.code;
                    setVerify(true);
                    setCode(code);
                    localStorage.setItem("code",code);
                }else if(response.data = "User Exists"){

                    // if user exist then send a err message
                    const error = user.errors;
                    error.email = "user already exists";
                    setUser({...user,error})
                }
            }
            catch(err){
                console.log("error in creating the user::", err);
            }
        }
    }

    console.log(code)
    return (
        <>
        {/* title */}
         <div className="verifytitle">
                <FontAwesomeIcon icon={faBoltLightning} className="verify-icon"/>
                <h1>Electron</h1>
             </div>

             {/* create account form */}
            <div className="createaccount">
                <form onSubmit={handleSubmit} className="createAccountForm">
                    <h3 className="reg">Register</h3>
                    {inputs.map(input => <FormInput key = {input.id} {...input} value={user[input.name]} errors={user.errors[input.name]} onChange = {handleChange} className="regInp"/>)}
                   <button className="regButton btn btn-primary">submit</button>
                </form>
                {console.log(code)}

                {/* if verified only then redirect the user to the login page... */}
                {verify ? 
                    window.location.href="/createaccount" : ""}
            </div>
        </>
    )
}

export default Verification;