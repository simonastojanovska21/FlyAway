import React from "react";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Circles from "../RatingStars/circles";

const HotelReview=(props)=>{

    return(
        <div className={"row"}>
            {props.hotelReview === undefined ? <></> :
                <>
                    <div className={"col-5 row"}>
                        <div className={"col-3 text-center"}>
                            <FontAwesomeIcon icon={faCircleUser} size={"3x"}/>
                        </div>
                        <div className={"col-9"}>
                            <span className={"fw-bold"}>{props.hotelReview.author}</span>
                            <br/>
                            <small className={"text-muted text-sm-end"}>Commented on: {props.hotelReview.datePublished}</small>
                        </div>

                    </div>
                    <div className={"col-7"}>
                        <Circles hotelRating={props.hotelReview.reviewRating}/>
                        <br/>
                        <span className={"text-muted"} style={{whiteSpace:'pre-wrap'}}>
                            {props.hotelReview.reviewBody}
                        </span>
                    </div>
                </>
            }
        </div>
    )
}

export default HotelReview;