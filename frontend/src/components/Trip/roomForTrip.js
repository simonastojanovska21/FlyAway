import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBed, faCheck} from "@fortawesome/free-solid-svg-icons";
import GenerateSemanticData from "../../semantic/GenerateSemanticData";

const RoomForTrip=(props)=>{


    return(
        <div className={"border-bottom "}>
            <div className={"choose-room-images mx-auto text-center pt-3"}>
                <h5 >{props.room.roomType} room</h5>
                <img src={props.room.roomImages[0]} className={"d-block w-75 h-75 mx-auto"} alt={"room"}/>
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

                <script type="application/ld+json">
                    {JSON.stringify(GenerateSemanticData.createRoom(props.room))}
                </script>
            </div>
        </div>
    )
}

export default RoomForTrip;