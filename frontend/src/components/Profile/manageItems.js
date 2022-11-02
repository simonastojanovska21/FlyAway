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
            <Link className={"btn mt-3 w-50 fw-bold text-white"}  to={"/trips/add"}
                  style={{backgroundColor: '#BB0422'}}>
                Add trip
            </Link>
            <br/>
            <Link className={"btn mt-3 w-50 fw-bold text-white"}  to={"/destinations"}
                  style={{backgroundColor: '#BB0422'}}>
                Destinations
            </Link>
        </div>
    )
}

export default ManageItems;