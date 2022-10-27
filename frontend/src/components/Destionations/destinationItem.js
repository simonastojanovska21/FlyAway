import React from "react";
import {Link} from "react-router-dom";

const DestinationItem=(props)=>{
//style={{height:'70%'}}
    return(
        <div className="col-4">
            <div className={"card shadow p-3  rounded"} style={{height:'350px'}}>
                <img src={props.destination.destinationThumbnail} style={{height:'65%'}} alt={"destination thumbnail"}/>
                <h3 className={"pt-2 text-start"}>
                    {props.destination.destinationLocation.city}, {props.destination.destinationLocation.country}
                </h3>
                <div className={"d-flex justify-content-between pt-2 pb-2"}>
                    <Link className={"btn text-white me-2 w-100"}
                          to={`/destinations/${props.destination.id}`}
                          onClick={()=>props.setSelectedDestinationId(props.destination.id)}
                          style={{backgroundColor:'#8AA6CA'}} >
                        Explore {props.destination.destinationLocation.city}
                    </Link>

                    <button className={"btn text-white me-2 w-100 "}
                          style={{backgroundColor:'#BB0422'}} >
                        Book now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DestinationItem;