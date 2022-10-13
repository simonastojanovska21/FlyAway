import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft, faPlus, faMinus, faCalendarDays} from "@fortawesome/free-solid-svg-icons";

const ReviewList=(props)=>{

    return(
        <div className={"p-5"}>
            <div className={"row "}>
                <div className="col">

                    <div className={"bubble bubble-bottom-left mb-5 pb-3 shadow"}>
                        Perfect service, best quality, thanks
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <img
                                src="https://e7.pngegg.com/pngimages/439/19/png-clipart-avatar-user-profile-icon-women-wear-frock-face-holidays.png"
                                className="rounded-circle reviewImages"
                                alt="Cinque Terre"/>
                        </div>
                        <div className="col-9 text-start ps-2">
                            <span>Username</span><br/>
                            <span>Date</span>
                        </div>
                    </div>
                </div>

                <div className="col">

                    <div className={"bubble bubble-bottom-left mb-5 pb-3 shadow"}>
                        Perfect service, best quality, thanks
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <img
                                src="https://e7.pngegg.com/pngimages/439/19/png-clipart-avatar-user-profile-icon-women-wear-frock-face-holidays.png"
                                className="rounded-circle reviewImages"
                                alt="Cinque Terre"/>
                        </div>
                        <div className="col-9 text-start ps-2">
                            <span>Username</span><br/>
                            <span>Date</span>
                        </div>
                    </div>
                </div>

                <div className="col">

                    <div className={"bubble bubble-bottom-left mb-5 pb-3 shadow"}>
                        Perfect service, best quality, thanks
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <img
                                src="https://e7.pngegg.com/pngimages/439/19/png-clipart-avatar-user-profile-icon-women-wear-frock-face-holidays.png"
                                className="rounded-circle reviewImages"
                                alt="Cinque Terre"/>
                        </div>
                        <div className="col-9 text-start ps-2">
                            <span>Username</span><br/>
                            <span>Date</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ReviewList;