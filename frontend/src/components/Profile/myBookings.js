import React, {Component} from "react";
import BookingItem from "../Bookings/bookingItem";
import BookingService from "../../services/BookingService";
import {Link} from "react-router-dom";

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

                        {this.state.bookings.length === 0 ?
                            <div className={"row g-4 pt-3"}>
                                <h3 className={"redText"}>Look like you do not have any trips.</h3>
                                <Link className={"btn w-50 text-white mx-auto mt-3"} style={{backgroundColor:'#515153'}}
                                      onClick={()=>this.props.setSearchTrip('any','any','any')}
                                      to={"/trips"}>View trips</Link>
                            </div>
                            :
                            <div className={"row g-4 pt-3"}>
                                <span className={"text-muted"}>View all your trips</span>
                                {this.state.bookings.map((term) => {
                                    return (
                                        <BookingItem booking={term}
                                                     setSelectedBookingId={this.props.setSelectedBookingId}/>
                                    )
                                })}
                            </div>
                        }

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