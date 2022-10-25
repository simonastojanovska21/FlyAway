import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBed, faCheck} from "@fortawesome/free-solid-svg-icons";

const RoomForTrip=(props)=>{

    const imageUrl=props.images

    return(
        <div className={"border-bottom "}>
            <div className={"choose-room-images mx-auto text-center"}>
                <h5 >{props.room.roomType} room</h5>
                <img src={props.room.roomImages[0]} className={"d-block w-75 h-75 mx-auto"}/>
                <span >
                    <FontAwesomeIcon icon={faUser} className={"me-2"}/>
                    Room fits {props.room.numberOfGuests} guests
                </span>
                <br/>
                <span>
                    <FontAwesomeIcon icon={faBed} className={"me-2"}/>
                    Assigned at check-in
                </span>
                <div className={"d-flex justify-content-between pt-3 pb-3"}>
                    <span className={"fw-bold pt-2"} style={{fontSize:'15px'}}>
                        {props.room.pricePerNightForTrip} &euro; per night
                    </span>
                    <div className={"d-grid g-2 w-50 h-75"}>
                        {props.isSelected ?
                            <button className={"btn text-white"} style={{backgroundColor:'#BB0422'}} >
                                <FontAwesomeIcon icon={faCheck} />
                            </button> :
                            <button className={"btn  text-white"} style={{backgroundColor:'#8AA6CA'}}
                                    onClick={()=> props.onSelectRoom(props.room.pricePerNightForTrip,props.room.roomId) } >
                                Choose
                            </button>
                             }
                    </div>

                </div>
            </div>



        </div>
    )
}

export default RoomForTrip;