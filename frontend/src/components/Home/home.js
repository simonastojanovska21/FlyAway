import React, {useEffect} from "react";
import cover from "../../images/cover.jpg"
import {Link} from "react-router-dom";
import Search from "../Search/search";
import TopOffers from "../TopOffers/topOffers";
import ReviewList from "../Reviews/reviewList";
import PopularDestinations from "../Destionations/popularDestinations";
import {changeTitle} from "react-set-title";

const Home=(props)=>{
    changeTitle('Home');
    return(
        <div>

            <div style={{position: 'relative'}} id={"heroImageSearch"}>
                <div className="card text-white border-0">
                    <img src={cover} className="d-block w-100 card-img rounded-0" alt="around the world" />

                    <div className="card-img-overlay text-center" style={{top: '87%', left:'7%', right:'7%'}}>
                        <Search setSearchTrip={props.setSearchTrip}/>
                    </div>

                </div>
            </div>

            <div className={"lightBackground pb-2"} style={{paddingTop:'120px'}} id={"topOffers"}>
                <div className={"container text-center"}>
                    <span className={"title"}>Top 3 offers</span>
                    <TopOffers offers={props.topOffers} setSelectedTripId={props.setSelectedTripId} />
                </div>
            </div>

            <div className={"blueBackground pt-5 pb-4"} id={"reviewList"}>
                <div className={"container text-center"}>
                    <span className={"title"}>Our customers said...</span>
                    <ReviewList reviews={props.reviews}/>
                </div>
            </div>

            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center"}>
                    <span className={"title"}>Popular destinations</span>
                    <PopularDestinations  popularDestinations={props.popularDestinations}
                                          setSelectedDestinationId={props.setSelectedDestinationId}/>
                </div>
            </div>

        </div>
    )
}

export default Home;