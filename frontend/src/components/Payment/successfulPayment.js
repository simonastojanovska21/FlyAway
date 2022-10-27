import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const SuccessfulPayment=(props)=>{

    return(
        <div className={"lightBackground pb-5"}>
            <div className={"container text-center pt-5"}>
               <div className={"p-5"}>
                   <FontAwesomeIcon icon={faCreditCard} size={"6x"} fade />
                   <h2 className={"redText pt-5"}>You have successfully paid for your trip.</h2>
                   <div className={"row w-50 mx-auto pt-4"}>
                       <Link className={"btn text-white w-100"}
                             to={"/profile"} style={{backgroundColor: '#8AA6CA'}} >
                           Continue
                       </Link>
                   </div>
               </div>
            </div>
        </div>
    )
}

export default SuccessfulPayment;