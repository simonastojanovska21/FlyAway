import React, {Component} from "react";
import TripService from "../../services/TripService";
import HotelService from "../../services/HotelService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarWeek, faClock,faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Stars from "../RatingStars/stars";
import AllHotelImages from "../Trip/allHotelImages";
import {Link} from "react-router-dom";
import RoomForTrip from "../Trip/roomForTrip";
import TripDetailsMap from "../Maps/tripDetailsMap";
import HotelReview from "../Reviews/hotelReview";
import LeaveHotelReview from "../Reviews/leaveHotelReview";
import ReviewService from "../../services/ReviewService";
import HotelAmenities from "../Trip/hotelAmenities";
import TripDetailsImages from "./tripDetailsImages";
import BookingService from "../../services/BookingService";

class TripDetails extends Component{
    constructor(props) {
        super(props);
        this.state={
            tripDetails:{},
            tripInHotelDetails:{},
            hotelDetails:{},
            hotelLocation:{},
            imagesForHotel:[],
            locationOnMap:{},
            roomsList:[],
            pricePerNight:0,
            selectedRoomId:'',
            showLeaveReviewModal:false
        }
    }

    render() {
        return(
            <div className={"lightBackground pb-5"}>
                <div className={"container pt-5"}>
                    <div className={"row"}>
                        <div className={"col-7"}>
                            <h3 className={"text-start"}>{this.state.hotelDetails.name}</h3>
                            <Stars numberStars={this.state.hotelDetails.stars} />
                            <h6 className={"pt-2"}>
                                {this.state.hotelDetails.address} - {this.state.hotelLocation.city}, {this.state.hotelLocation.country}
                            </h6>
                        </div>
                        <div className={"col-5 pt-5"}>
                            <div className={"row g-3"}>
                                <div className={"col-6"}>
                                    <div className="input-group input-group-lg border rounded">
                                        <span className="input-group-text border-0 bg-body">
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </span>
                                        <input type="text" className="form-control border-0 bg-white"
                                               value={this.state.tripDetails.startDate}
                                               disabled/>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="input-group input-group-lg border rounded">
                                        <span className="input-group-text border-0 bg-body">
                                            <FontAwesomeIcon icon={faCalendarWeek} />
                                        </span>
                                        <input type="text" className="form-control border-0 bg-white"
                                               value={this.state.tripDetails.endDate}
                                               disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TripDetailsImages imagesForHotel={this.state.tripInHotelDetails.allImagesForHotel} />


                    <div className={"row pt-5"}>
                        <div className={"col-8"}>
                            <div className={"shadow bg-body p-4"} style={{whiteSpace:'pre-wrap'}}>
                                <p className={"pb-4"} style={{fontSize:'18px'}}>About the property</p>
                                <span className={"text-muted"}>{this.state.hotelDetails.description}</span>
                            </div>

                            <div className={"shadow bg-body mt-5 p-4"} >
                                <h3>Check in and check out</h3>
                                <div className={"row"}>
                                    <div className={"col-2 text-center pt-4"}>
                                        <FontAwesomeIcon icon={faClock} size={"3x"} className={"me-2"}/>
                                    </div>
                                    <div className={"col-5 text-start pt-3"}>
                                        <span className={"checkText"}>Check in from:
                                        </span>
                                        <h4>{this.state.hotelDetails.checkInHour}:00</h4>
                                    </div>

                                    <div className={"col-5 text-start pt-3"}>
                                        <span className={"checkText"}>Check out before:
                                        </span>
                                        <h4>{this.state.hotelDetails.checkOutHour}:00</h4>
                                    </div>
                                </div>
                            </div>

                            <div className={"shadow bg-body mt-5 p-4"} >
                                <h3>Amenities</h3>
                                <HotelAmenities amenities={this.state.hotelDetails.amenities} />
                            </div>

                            <div className={"shadow bg-body mt-5 p-4"} >
                                <h3>Location</h3>
                                <TripDetailsMap location={this.state.locationOnMap} />

                            </div>

                            <div className={"shadow bg-body mt-5 p-4"} >
                                <div className={"d-flex justify-content-between pb-4"}>
                                    <h3>Customer reviews</h3>
                                    <button className={"btn text-white"} style={{backgroundColor:'#8AA6CA'}}
                                            onClick={() => this.setShowLeaveReviewModal(true)}>
                                        Leave review for hotel
                                    </button>
                                </div>
                                <LeaveHotelReview show={this.state.showLeaveReviewModal}
                                                  onHide={() => this.setShowLeaveReviewModal(false)}
                                                  hotelId={this.state.hotelDetails.id}
                                                  onLeaveHotelReview={this.leaveHotelReview} />
                                <HotelReview hotelReview={this.state.hotelReview}  />
                            </div>
                        </div>

                        <div className={"col-4 bookingDetails"}>
                            <div className={"border border-1 bg-body ps-5 pe-5"}>
                                <div className={"d-flex justify-content-between pt-4"}>
                                    <p style={{fontSize:'18px'}}>Trip total</p>
                                    <p className={"fw-bold"} style={{fontSize:'20px'}}>
                                        { this.calculateTotalPrice()  } &euro;
                                    </p>
                                </div>
                                <div className={"d-flex justify-content-between pb-2"}>
                                    <p className={"text-muted"}>Room for {this.state.tripDetails.tripDuration} nights</p>
                                </div>
                                <div className={"d-grid g-2 mb-3"}>
                                    <button className={"btn text-white p-2"} style={{backgroundColor:'#BB0422'}}
                                            onClick={()=>this.addNewBooking()}>
                                        Book now
                                    </button>
                                </div>
                            </div>

                            <div className={"border border-1 mt-4 bg-body"}>
                                <div className={"choose-room-header"}>Choose room type</div>
                                <hr/>
                                <div className={"choose-room-content"}>
                                    {this.state.roomsList.map((room)=>{
                                        return(
                                            <RoomForTrip room={room} onSelectRoom={this.onSelectRoom}
                                                         isSelected={this.state.selectedRoomId===room.roomId} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const tripId = localStorage.getItem("selectedTripId")
        this.getTripDetails(tripId)

        const hotelId=localStorage.getItem("selectedHotelId");
        this.getTripInHotelDetails(tripId,hotelId)
    }

    getTripDetails=(tripId)=>{
        TripService.getTripDetails(tripId)
            .then((data)=>{
                this.setState({
                    tripDetails:data.data,
                    hotelDetails:data.data.tripInHotel,
                    hotelLocation: data.data.tripInHotel.hotelLocation,
                    locationOnMap:{
                        latitude:data.data.tripInHotel.hotelLocation.latitude,
                        longitude:data.data.tripInHotel.hotelLocation.longitude,
                        hotelName:data.data.tripInHotel.name,
                        address:data.data.tripInHotel.address,
                        city:data.data.tripInHotel.hotelLocation.city,
                        country:data.data.tripInHotel.hotelLocation.country
                    }
                })
            })
    }

    getTripInHotelDetails=(tripId,hotelId)=>{
        HotelService.getTripInHotelDetails(tripId,hotelId)
            .then((data)=>{
                this.setState({
                    tripInHotelDetails:data.data,
                    imagesForHotel:data.data.allImagesForHotel,
                    roomsList:data.data.roomsInHotel,
                    hotelReview:data.data.hotelReviewDto,
                    pricePerNight: data.data.roomsInHotel[0].pricePerNightForTrip,
                    selectedRoomId:data.data.roomsInHotel[0].roomId,
                })
            })
    }

    setShowLeaveReviewModal=(value)=>{
        this.setState({
            showLeaveReviewModal:value
        })
    }
    calculateTotalPrice=()=>{
        return this.state.pricePerNight*this.state.tripDetails.tripDuration
    }

    onSelectRoom=(pricePerNight,selectedRoomId)=>{
        this.setState({
            pricePerNight:pricePerNight,
            selectedRoomId:selectedRoomId,
        })
    }

    leaveHotelReview=(stars,description,username,hotelId)=>{
        ReviewService.leaveHotelReview(stars,description,username,hotelId)
            .then(()=>{})
    }

    addNewBooking=()=>{

        BookingService.addNewBooking(localStorage.getItem("username"),this.state.tripDetails.tripId,
            this.state.selectedRoomId,this.calculateTotalPrice())
            .then(()=>{
                window.location.href='http://localhost:3000/bookings'
            })
    }
}

export default TripDetails;