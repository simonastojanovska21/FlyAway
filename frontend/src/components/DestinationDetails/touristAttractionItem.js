import React from "react";

const TouristAttractionItem=(props)=>{
    return(
        <div className={"touristAttractionColumn p-3"}>
            <div className={"card"} style={{height:'350px'}}>
                <img src={props.item.imageUrl} className={"rounded"}  style={{height:'55%'}} alt={"wikidata"}/>
                <p className={"pt-2 text-center fw-bold"}>
                    {props.item.name}
                </p>

                <p className={" text-center"}>
                    {props.item.description}
                </p>
            </div>
        </div>
    )
}

export default TouristAttractionItem;