import React from "react";
import {Link} from "react-router-dom";
import GenerateSemanticData from "../../semantic/GenerateSemanticData";

const DestinationItem=(props)=>{

    return(
        <div className="col-4 p-3">
            <div className={"card shadow p-3  rounded"} style={{height:'350px'}}>
                <img src={props.destination.destinationThumbnail} style={{height:'65%'}} alt={"destination thumbnail"}/>
                <h3 className={"pt-2 text-start"}>
                    {props.destination.destinationLocation.city.split(",")[0]}, {props.destination.destinationLocation.country
                === 'United States of America' ? 'USA' : props.destination.destinationLocation.country  }
                </h3>
                <div className={"d-flex justify-content-between pt-2 pb-2"}>
                    <Link className={"btn text-white me-2 w-100"}
                          to={`/destinations/${props.destination.id}`}
                          onClick={()=>props.setSelectedDestinationId(props.destination.id)}
                          style={{backgroundColor:'#8AA6CA'}} >
                        Explore {props.destination.destinationLocation.city.split(",")[0]}
                    </Link>

                    <Link className={"btn text-white me-2 w-100 "}
                            to={`/trips`}
                            onClick={()=>props.setSearchTrip(props.destination.destinationLocation.city,'any','any')}
                          style={{backgroundColor:'#BB0422'}} >
                        Book now
                    </Link>
                </div>
            </div>
            <script type="application/ld+json">
                {JSON.stringify(GenerateSemanticData.createTouristDestination(props.destination))}
            </script>
        </div>
    )
}

export default DestinationItem;