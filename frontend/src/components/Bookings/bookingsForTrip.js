import React, {Component} from "react";
import BookingService from "../../services/BookingService";
import BookingItem from "./bookingItem";

class BookingsForTrip extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookingsForTrip:[]
        }
    }
    render() {
        return(
            <div className={"lightBackground pb-5"}>
                <div className={"container text-center"}>
                    <h1 className={"fw-bold pt-5"}>Bookings for trip</h1>
                    <span className={"text-muted"}>View all the bookings for the selected trip</span>

                    <div className={"row g-4 pt-5"}>
                        {this.state.bookingsForTrip.length === 0 ?
                            <div>
                                <h3 className={"redText"}>Looks like there are no bookings for this trip!</h3>
                            </div>
                            :
                            this.state.bookingsForTrip.map((term)=>{
                                return(
                                    <BookingItem booking={term} setSelectedBookingId={this.props.setSelectedBookingId}
                                                  />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const tripId = localStorage.getItem("selectedTripId")
        this.getAllBookingsForTrip(tripId)
    }

    getAllBookingsForTrip=(tripId)=>{
        BookingService.getAllBookingsForTrip(tripId)
            .then((data)=>{
                this.setState({
                    bookingsForTrip:data.data
                })
            })
    }
}

export default BookingsForTrip;