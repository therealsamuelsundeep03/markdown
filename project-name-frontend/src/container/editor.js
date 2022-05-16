import {useState} from "react";
import ReactMarkdown from "react-markdown";
import {Button} from "react-bootstrap";
import axios from "axios";

import "../css/editor.css";
import Nav from "../component/nav";

function Editor () {

    const initialState = 
    `sample coding...

# Heading1 
**i am bold** 

- list item 1
- list item 2
- list item 3

[search anything](https://www.google.com/)`


    const [markdown,setMarkdown]  = useState(initialState);
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState("");
    const [error,setError] = useState("");

    // getting details of is logged in to check if the user is logged in or not...
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // handle change for preview
    const handleChange =({target : {value}}) => {
        setMarkdown(value);
    }

    // handle change for title
    const handlingChange = ({target : {value}}) => {
        setTitle(value)
    }

    // set state for modal
    const save = async() => {
        setModal(true)
    } 

    const handlingSubmit = async(e) => {
        e.preventDefault();

        // title validations...
        if(title.length < 5){
            setError("title must be 5 atleast characters");
        }else if(title.length > 30){
            setError("title must not exceed 15 characters");
        }else{

            // if title is validated then save the code in the backend
            const email = localStorage.getItem('email')
            const code = {title,markdown,email};
            const response = await axios.post("https://reactmarkeditor.herokuapp.com/saved",code)
            setModal(false);
            alert("project added");
        }
    }

    return (
        <>
            {/* if user is not logged in then redirect him to the login page... */}
            {isLoggedIn ?
            (<>                
                <Nav />
                <div className={modal && "blur"}>
                <div className={`markdown ${modal && 'position'}`}>
                    <textarea value={markdown} onChange={handleChange} style={{lineHeight:'2rem'}}/>

                    <ReactMarkdown className="preview" children={markdown} style={{lineHeight:'5rem'}}/>

                    <div className="save">
                        <Button type="submit" variant={"primary"} className = "save" onClick={save}>Save</Button>
                    </div>

                </div>
                </div>
            </>)
            : window.location.href="/login"}

            {/* dialog box for title... */}
            {modal && (
                <div className="codename">
                <form onSubmit={handlingSubmit}>
                    <h5 style={{color:'#fff',marginBottom:'2rem'}}>To save, Enter The Title</h5>
                    {error ? <span style={{color:'red',fontWeight:'400',marginBottom:'1rem'}}>{error}</span> : ""}
                    <input type="text" className="codeInp" value={title} onChange={handlingChange}/>
                    <button type = "submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            )}
        </>
    )
}
export default Editor;



            