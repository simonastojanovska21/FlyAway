import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import PersonalDetails from "./personalDetails";
import LeaveReview from "./leaveReview";
import ManageItems from "./manageItems";
import MyBookings from "./myBookings";
import $ from 'jquery';

const Profile=(props)=>{


    const [personalDetails, setPersonalDetails] = React.useState(true);
    const [myBookings, setMyBookings] = React.useState(false);
    const [leaveReview, setLeaveReview] = React.useState(false);
    const [manageItems, setManageItems] = React.useState(false);

    const displayPersonalDetails=(e)=>{
        e.preventDefault()
        setPersonalDetails(true)
        setMyBookings(false)
        setLeaveReview(false)
        setManageItems(false)
        $('#personalDetails').addClass('selectedProfileLink')
        $('#myBookings').removeClass('selectedProfileLink')
        $('#leaveReview').removeClass('selectedProfileLink')
        $('#manageItems').removeClass('selectedProfileLink')
    }

    const displayMyBookings=(e)=>{
        e.preventDefault()
        setPersonalDetails(false)
        setMyBookings(true)
        setLeaveReview(false)
        setManageItems(false)
        $('#personalDetails').removeClass('selectedProfileLink')
        $('#myBookings').addClass('selectedProfileLink')
        $('#leaveReview').removeClass('selectedProfileLink')
        $('#manageItems').removeClass('selectedProfileLink')
    }

    const displayLeaveRating=(e)=>{
        e.preventDefault()
        setPersonalDetails(false)
        setMyBookings(false)
        setLeaveReview(true)
        setManageItems(false)
        $('#personalDetails').removeClass('selectedProfileLink')
        $('#myBookings').removeClass('selectedProfileLink')
        $('#leaveReview').addClass('selectedProfileLink')
        $('#manageItems').removeClass('selectedProfileLink')
    }

    const displayManageItems=(e)=>{
        e.preventDefault()
        setPersonalDetails(false)
        setMyBookings(false)
        setLeaveReview(false)
        setManageItems(true)
        $('#personalDetails').removeClass('selectedProfileLink')
        $('#myBookings').removeClass('selectedProfileLink')
        $('#leaveReview').removeClass('selectedProfileLink')
        $('#manageItems').addClass('selectedProfileLink')
    }

    return(
        <div className={"lightBackground pt-5 pb-5"}>
            <div className={"container text-center"}>
                <h3 className="title">Your profile</h3>
                <div className={"row pt-4"}>
                    <div className={"col-3 blueBackground"}>
                        <ul className="nav flex-column text-start p-2">
                            <li className="nav-item mb-3 selectedProfileLink" id={"personalDetails"}>
                                <button className={"btn border-0"} style={{color:'#BB0422'}} onClick={displayPersonalDetails}>
                                    Personal details
                                </button>
                            </li>
                            <li className="nav-item mb-3" id={"myBookings"}>
                                <button className={"btn border-0"} style={{color:'#BB0422'}} onClick={displayMyBookings}>
                                    My bookings
                                </button>
                            </li>

                            <li className="nav-item mb-3" id={"leaveReview"}>
                                <button className={"btn border-0"} style={{color:'#BB0422'}} onClick={displayLeaveRating}>
                                    Leave review
                                </button>
                            </li>
                            {
                                localStorage.getItem("userRole") !== null &&
                                localStorage.getItem("userRole").endsWith("ADMIN") &&
                                <li className="nav-item mb-3" id={"manageItems"}>
                                    <button className={"btn border-0"} style={{color:'#BB0422'}} onClick={displayManageItems}>
                                        Manage trips and destinations
                                    </button>
                                </li>
                            }

                        </ul>
                    </div>

                    <div className={"col-9"}>
                        {personalDetails && <PersonalDetails user={props.user} />}
                        {myBookings && <MyBookings setSearchTrip={props.setSearchTrip}/>}
                        {leaveReview && <LeaveReview username={props.user.username}
                                                     onLeaveReview={props.onLeaveReview} /> }

                        {manageItems && <ManageItems />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;