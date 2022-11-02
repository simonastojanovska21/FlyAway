import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import Stars from "../RatingStars/stars";
import {Link} from "react-router-dom";
import GenerateSemanticData from "../../semantic/GenerateSemanticData";

const OfferItem=(props)=>{

    return(
        <div className="card shadow p-3 rounded" style={{height:'590px'}}>
            <div className={"h-75 "}>
                <img src={props.item.imageUrl} className="img-fluid h-100" alt="..."/>
            </div>

            <div className={"p-3"}>
                <p className={"card-text text-start"}>
                    <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                    <span className={"ps-4 text-muted"}>{props.item.location}</span>
                </p>

                <h5 className="card-title text-start fw-bold pt-2">{props.item.hotelName}</h5>

                <p className={"pt-3 text-start"}>
                    From:<span className={"fw-bold"}>
                    {props.item.startDate}</span> to: <span className={"fw-bold"}>
                    {props.item.endDate}</span></p>

                <div className={"text-start"}>
                    <Stars numberStars={props.item.stars} />
                </div>
                <div className={"text-end"}>
                    <span className={"card-text h4"}>{props.item.pricePerNight} (&euro;)</span>
                    <span className={"card-text text-muted"}>
                                 per night
                            </span>
                </div>

                <Link className={"btn w-100 mt-3 text-white"}
                      style={{backgroundColor:'#8AA6CA'}}
                      onClick={()=>props.setSelectedTripId(props.item.tripId,props.item.hotelId)} to={`/trips/details/${props.item.tripId}`}>
                    See details
                </Link>
            </div>
            <script type="application/ld+json">
                {JSON.stringify(GenerateSemanticData.createTouristTripFromOffer(props.item))}
            </script>
        </div>
    )
}

export default OfferItem;