import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import Stars from "../RatingStars/stars";

const OfferItem=(props)=>{

    return(
        <div className="card mb-3 shadow p-3 mb-5 rounded">
            <img src={props.item.imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <p className={"card-text text-start"}>
                    <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                    <span className={"ps-4 text-muted"}>{props.item.location}</span>
                </p>

                <h5 className="card-title text-start fw-bold pt-2">{props.item.hotelName}</h5>

                <p className={"pt-3 text-start"}>
                    From:<span className={"fw-bold"}>
                    {props.item.startDate}</span> to: <span className={"fw-bold"}>
                    {props.item.endDate}</span></p>

                <div className={"d-flex justify-content-between pb-2 pt-3"}>
                    <div>
                        <Stars numberStars={props.item.stars} />
                    </div>
                    <div>
                        <span className={"card-text h4"}>{props.item.pricePerNight} (&euro;)</span>
                        <span className={"card-text text-muted"}>
                                 per night
                            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferItem;