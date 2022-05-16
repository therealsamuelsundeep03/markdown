import { useEffect, useState } from "react";

function Savedcard (props) {
    const [items,setItems] = useState(false)

    useEffect(() => {
        if(props.noitems){
            setItems(false);
        }else if(props.code){
            setItems(true);
        }
    },[])

    return (
        <>
            {items ? 
                (
                    <>
                        <div className="savedRow">
                            <h3>{props.code.title}</h3>
                            <div>{props.code.markdown}</div> 
                        </div>
                    </>
                ): (
                    <>
                        <div className="savedrow">
                            <h3 className="nocodemessg">No Saved Codes !!! </h3>
                        </div>
                    </>
                )}
        </>
    )
}

export default Savedcard;

  