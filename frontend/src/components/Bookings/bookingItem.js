import React from "react";
import {Link} from "react-router-dom";
import BookingService from "../../services/BookingService";

const BookingItem=(props)=>{
    const reload=()=>{
        window.location.reload()
    }

    return(
        <div className={"col-6 text-start "}>
            <div className={"p-3 shadow bg-body h-100"}>
                <h4 className={"redText"}>{props.booking.hotelName}</h4>
                <p className={"text-muted ps-3"}>Booking id: {props.booking.bookingId}</p>
                <p className={"ps-3"}>
                    Trip from:<span className={"fw-bold"}>
                    {props.booking.startDate}</span> to: <span className={"fw-bold"}>{props.booking.endDate}</span></p>

                <div className={"d-flex justify-content-between pe-5"}>
                    <p className={"ps-3"}>
                        {props.booking.roomType} room for {props.booking.numberOfPeople} guests
                    </p>
                    <p className={"fw-bold"} style={{fontSize:'23px'}}>
                        {props.booking.tripPrice} &euro;
                    </p>
                </div>

                <div className={"d-flex justify-content-between ps-3 pe-3"}>

                    {props.booking.bookingStatus==='RESERVED' &&
                        <Link className={"btn text-white me-2"}
                              onClick={()=>props.setSelectedBookingId(props.booking.bookingId)}
                              to={`/payment/${props.booking.bookingId}`} style={{backgroundColor:'#515153'}} >
                            Pay for trip
                        </Link> }
                    {props.booking.bookingStatus==='PAID' &&
                    <button className={"btn text-white me-2"} disabled style={{backgroundColor:'#515153'}} >
                        Paid trip
                    </button> }
                    {props.booking.bookingStatus==='CANCELED' &&
                    <button className={"btn text-white me-2"} disabled style={{backgroundColor:'#515153'}} >
                        Canceled trip
                    </button> }
                    {
                        props.booking.bookingStatus !=='CANCELED' &&
                        localStorage.getItem("userRole") !== null &&
                        localStorage.getItem("userRole").endsWith("EMPLOYEE") &&
                        <button className={"btn text-white "}
                                onClick={()=>{BookingService.cancelBookingForTrip(props.booking.bookingId); window.location.reload();}}
                              style={{backgroundColor:'#BB0422'}} >
                            Cancel booking
                        </button>
                    }

                </div>

            </div>
        </div>
    )
}

export default BookingItem;