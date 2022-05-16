import { useEffect, useState } from "react";

import Nav from "../component/nav";
import {savedCode} from "../service/savedCode";
import Savedcard  from "../component/savedcard";
import "../css/saved.css";

function Saved() {
    const [showCode,setCode] = useState([]);
    const [nosaved,setNotSaved] = useState('');

    useEffect(() => {
        async function getCode() {
            const response = await savedCode();
            // console.log('',response)
            if(response === "No Codes Saved"){
                setNotSaved("No Codes Saved!!!")
            }else if(response.saved){
                setCode(response.saved);
            }
        }
        getCode();
      },[]);

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log("props",showCode);

    return (
        <>
            {isLoggedIn ?
                (<>                
                    <Nav />
                    <div className="saved">
                        {showCode && showCode.map(code => <Savedcard code={code}/>)}
                        {nosaved && <Savedcard noitems={'no items'}/>}
                    </div>
                </>)
            : window.location.href="/login"}
        </>
    )
}
export default Saved;
