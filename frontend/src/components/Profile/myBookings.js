import React, {Component} from "react";
import BookingItem from "../Bookings/bookingItem";
import BookingService from "../../services/BookingService";

class MyBookings extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookings:[]
        }
    }
    render() {
        return(
            <div className={"lightBackground pb-5"}>
                <div className={"container text-center"}>
                    <span className={"text-muted"}>View all your trips</span>

                    <div className={"row g-4 pt-3"}>
                        {this.state.bookings.length === 0 ? <></> :

                            this.state.bookings.map((term)=>{
                                return(
                                    <BookingItem booking={term} setSelectedBookingId={this.props.setSelectedBookingId} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllBookingsForUser();
    }

    getAllBookingsForUser=()=>{
        BookingService.getAllBookingsForUser(localStorage.getItem("username"))
            .then((data)=>{
                this.setState({
                    bookings:data.data
                })
            })
    }
}

export default MyBookings;