import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OfferItem from "./offerItem";

const TopOffers=(props)=>{
    return(
        <div className={"p-5"} >
            {props.offers.length===0 ? <></> :
                <div className={"row"}>
                    {props.offers.map((term)=>{
                        return(
                            <div className={"col-4"}>
                                <OfferItem item={term} setSelectedTripId={props.setSelectedTripId}  />
                            </div>
                        )
                    })}
                </div>}
        </div>
    )
}

export default TopOffers;