import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Stars from "../RatingStars/stars";

const ReviewList=(props)=>{

    return(
        <div className={"p-5"}>
            <div className={"row "}>

                {props.reviews.map((term)=>{
                    return(
                        <div className="col">
                            <div className={"bubble bubble-bottom-left mb-5 pb-3 shadow"}>
                                {term.description}
                            </div>

                            <div className="row">
                                <div className="col-3 pt-2">
                                    <FontAwesomeIcon icon={faCircleUser} size={"4x"}/>
                                </div>
                                <div className="col-9 text-start ps-2">
                                    <span>{term.user.name} {term.user.surname}</span><br/>
                                    <span>{moment(term.time).format('Do MMM YYYY')}</span>
                                    <Stars numberStars={term.stars}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default ReviewList;