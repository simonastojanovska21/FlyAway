import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle as fullCircle, faStar} from "@fortawesome/free-solid-svg-icons";
import {faCircle as emptyCircle} from "@fortawesome/free-regular-svg-icons"

const Circles=(props)=>{

    return(
        <div className={"pt-2"} >
            {Array.apply(null, {length:props.hotelRating})
                .map((t)=><FontAwesomeIcon icon={fullCircle} className={"pe-1"} color={'#BB0422'} />)}

            {Array.apply(null, {length: 5-props.hotelRating})
                .map((t)=><FontAwesomeIcon icon={emptyCircle} className={"pe-1"} /> )}

            <span className={"ps-2"}>{props.hotelRating}/5 User rating </span>
        </div>
    )
}

export default Circles;
