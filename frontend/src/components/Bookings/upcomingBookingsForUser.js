import React, {Component} from "react";
import BookingService from "../../services/BookingService";
import BookingItem from "./bookingItem";

class UpcomingBookingsForUser extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookings:[]
        }
    }

    render() {
        return (
            <div className={"lightBackground pb-5"}>
                <div className={"container text-center"}>
                    <h1 className={"fw-bold pt-5"}>My bookings</h1>
                    <span className={"text-muted"}>View your upcoming trips</span>

                    <div className={"row g-4 pt-5"}>
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
        );
    }

    componentDidMount() {
        this.getUpcomingBookingsForUser()
    }

    getUpcomingBookingsForUser=()=>{
        BookingService.getUpcomingBookingsForUser(localStorage.getItem("username"))
            .then((data)=>{
                this.setState({
                    bookings:data.data
                })
            })
    }
}

export default UpcomingBookingsForUser;