import React from "react";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Loading=(props)=>{
    return(
        <div className={"row text-center"}>
            <FontAwesomeIcon icon={faSpinner} size={"6x"} pulse />
        </div>
    )
}

export default Loading;