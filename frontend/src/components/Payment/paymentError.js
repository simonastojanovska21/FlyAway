import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadTear} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {changeTitle} from "react-set-title";

const PaymentError =(props)=>{
    changeTitle('Payment error');
    return(
        <div className={"lightBackground pb-5"}>
            <div className={"container text-center pt-5"}>
                <div className={"p-5"}>
                    <FontAwesomeIcon icon={faSadTear} size={"6x"} fade />
                    <h3 className={"redText pt-5"}>Oh no... </h3>
                    <h3 className={"redText"}>There was some error while processing you payment</h3>
                    <h4 className={"text-muted"}>Try again later or contact us</h4>
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

export default PaymentError;