import React, {Component} from "react";
import BookingService from "../../services/BookingService";
import {Link} from "react-router-dom";
import StripeButton from "./stripeButton";

class PayForBooking extends Component{
    constructor(props) {
        super(props);
        this.state={
            booking:{}
        }
    }

    render() {
        return(
            <div className={"lightBackground pb-5"}>
                <div className={"container text-center"}>
                    <h1 className={"fw-bold pt-5"}>Pay for booking</h1>
                    {this.state.booking === null ? <></> :
                        <div className={"w-75 mt-5 text-start p-5 bg-body shadow mx-auto"}>
                            <h4 >You are paying for:</h4>
                            <hr/>
                            <h6>Trip in
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.hotelCity}
                                </span>
                                in hotel
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.hotelName}
                                </span>
                            </h6>
                            <br/>
                            <h6>The trip starts from:
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.startDate}
                                </span>
                                and lasts to:
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.endDate}
                                </span>
                            </h6>
                            <br/>
                            <h6>You have booked
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.roomType}
                                </span>
                                room for
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.numberOfPeople}
                                </span>
                                guests.
                            </h6>
                            <br/>
                            <h6>Your booking id is:
                                <span className={" ps-2 pe-2 text-decoration-underline redText fw-bold"}>
                                    {this.state.booking.bookingId}
                                </span>
                            </h6>
                            <hr className={"fw-bold"}/>
                            <div className={"d-flex justify-content-between"}>
                                <h2>
                                    Your total is:
                                </h2>
                                <p className={"fw-bold redText pe-5"} style={{fontSize:'30px'}}>
                                    {this.state.booking.tripPrice} &euro;
                                </p>
                            </div>

                            <div className={"row mt-3"}>
                                <div className={"col"}>
                                    <Link className={"btn w-100 fw-bold text-white"}
                                          to={"/bookings"} style={{backgroundColor: '#8AA6CA'}} >
                                        Pay later
                                    </Link>
                                </div>

                                <div className={"col"} id={"checkOutButton"}>
                                    <StripeButton
                                                  price={this.state.booking.tripPrice}
                                                  bookingId={this.state.booking.bookingId} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getDetailsAboutBooking()
    }

    getDetailsAboutBooking=()=>{
        BookingService.getBookingDetails('187aa188-6231-447d-b19b-57e675610432')
            .then((data)=>{
                this.setState({
                    booking: data.data
                })
            })
    }

    payForBooking=()=>{

    }
}

export default PayForBooking;