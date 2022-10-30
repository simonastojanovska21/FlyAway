import React from "react";
import {Link} from "react-router-dom";

const ManageItems=(props)=>{
    const handleTrips=()=>{
        localStorage.removeItem("location")
        localStorage.removeItem("startDate")
        localStorage.removeItem("endDate")
    }
    return(
        <div className="ps-5 pe-5 text-start pt-3">
            <Link className={"btn mt-3 w-50 fw-bold text-white"}  to={"/admin/hotels"}
                  style={{backgroundColor: '#BB0422'}}>
                Hotels list
            </Link>
            <br/>
            <Link className={"btn mt-3 w-50 fw-bold text-white"} to={"/trips"} onClick={()=>handleTrips()}
                  style={{backgroundColor: '#BB0422'}}>
                Trips
            </Link>
            <br/>
            <Link className={"btn mt-3 w-50 fw-bold text-white"}  to={"/destination"}
                  style={{backgroundColor: '#BB0422'}}>
                Destinations
            </Link>
        </div>
    )
}

export default ManageItems;