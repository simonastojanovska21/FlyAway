import React from "react";
import TripImagesCarousel from "./tripImagesCarousel";
import Stars from "../RatingStars/stars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Circles from "../RatingStars/circles";
import {Link} from "react-router-dom";
import TripListMap from "../Maps/tripListMap";
import GenerateSemanticData from "../../semantic/GenerateSemanticData";

const TripItem=(props)=>{

    const formatHotelLocation=(hotelLocation)=>{
        return hotelLocation.city + ', ' + hotelLocation.country
    }

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div className="card border  rounded-2 mx-auto mb-5" style={{width:'85%'}}>
            <div className="row g-0" >
                <div className="col-md-7">
                    <div className={"showOnMap text-white"}>
                        <button className={"btn text-white rounded-circle"} style={{backgroundColor:'rgba(0,0,0,0.6)'}}
                                onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faLocationDot} size={"lg"} className={"p-1"} />
                        </button>
                        <TripListMap show={modalShow}
                                     onHide={() => setModalShow(false)}
                                     hotelName={props.trip.hotelForTrip.name}
                                     address={props.trip.hotelForTrip.address}
                                     location={props.trip.hotelForTrip.hotelLocation} />
                    </div>
                    <TripImagesCarousel images={props.trip.hotelImages}/>
                </div>
                <div className="col-md-5">
                    <div className="card-body ps-4 pe-5 pt-5 text-start">
                        <p className="card-text text-muted">
                            <FontAwesomeIcon icon={faMapPin} className={"pe-2"}/>
                            {formatHotelLocation(props.trip.hotelForTrip.hotelLocation)}</p>
                        <h4 className="card-title">{props.trip.hotelForTrip.name}</h4>
                        <span className={"card-text"}>
                            <Stars numberStars={props.trip.hotelForTrip.stars} />
                        </span>
                        <span className={"card-text pt-3"}>
                            <Circles hotelRating={props.trip.hotelRating}/>
                        </span>

                        <p className={"pt-3"}>
                            Trip from:<span className={"fw-bold"}>
                    {props.trip.startTime}</span> to: <span className={"fw-bold"}>{props.trip.endTime}</span></p>
                        <span className={"card-text text-end pricePerNight"}>
                            Price per night from: <br/>
                            <span className={"fw-bold"}>{props.trip.pricePerNight} (&euro;)</span>

                        </span>

                        <Link className="btn rounded-1 w-25 viewOfferButton text-white p-3 fw-bold"
                              onClick={()=>props.setSelectedTripId(props.trip.tripId,props.trip.hotelForTrip.id)}
                              to={`/trips/details/${props.trip.tripId}`}
                              style={{backgroundColor:'#8AA6CA', }}>
                            Trip details
                        </Link>

                        {
                            localStorage.getItem("userRole") !== null &&
                            (localStorage.getItem("userRole").endsWith("ADMIN") ||
                                localStorage.getItem("userRole").endsWith("EMPLOYEE")) &&
                            <Link className="btn rounded-1 viewBookingsButton text-white p-3 fw-bold"
                                  onClick={()=>props.setSelectedTripId(props.trip.tripId,props.trip.hotelForTrip.id)}
                                  to={`/bookings/forTrip/${props.trip.tripId}`}
                                  style={{backgroundColor:'#BB0422', }}>
                                View bookings
                            </Link>
                        }

                    </div>

                </div>
            </div>
            <script type="application/ld+json">
                {JSON.stringify(GenerateSemanticData.createTouristTripItem(props.trip))}
            </script>

        </div>
    )
}

export default TripItem;