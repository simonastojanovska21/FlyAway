import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Stars=(props)=>{


    return(
        <div>
            {Array.apply(null, {length: props.numberStars})
                .map((t)=><FontAwesomeIcon icon={faStar} size={"lg"} color={'#FF9529'} /> )}

            <span className={"ps-1"}>{props.numberStars} stars</span>
        </div>
    )
}

export default Stars;