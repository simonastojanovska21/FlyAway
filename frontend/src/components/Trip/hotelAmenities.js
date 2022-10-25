import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi, faSquareParking, faSnowflake, faPersonSwimming, faDumbbell,faPaw,
    faMartiniGlass, faUtensils, faChildren,faBriefcase, faSpa, faVault} from "@fortawesome/free-solid-svg-icons";
const HotelAmenities=(props)=>{

    const amenitiesMap={
        'Wi-Fi':faWifi,
        "Parking" : faSquareParking,
        "Air conditioning" : faSnowflake,
        "Pool" : faPersonSwimming,
        "Fitness centre" : faDumbbell,
        "Pets allowed":faPaw,
        "Bar":faMartiniGlass,
        "Restaurant" :faUtensils,
        "Playground" :faChildren,
        "Business center" :faBriefcase,
        "Spa" :faSpa,
        "Safe deposit box" :faVault
    }
    return(

        <div>
            {props.amenities === undefined ? <></> :
                <div className={"row g-3"}>
                    {props.amenities.split(",").map((term)=>{
                        return(
                            <div className={"col-2 "}>
                                <div className={"pt-4 pb-4 text-center rounded blueBackground"}>
                                    <FontAwesomeIcon icon={amenitiesMap[term]} size={"lg"} />
                                    <br/>

                                    {term}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default HotelAmenities;