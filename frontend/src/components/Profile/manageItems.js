import React from "react";
import {Link} from "react-router-dom";

const ManageItems=(props)=>{
    return(
        <div className="ps-5 pe-5 text-start pt-3">
            <Link className={"btn w-50 fw-bold text-white"} to={"/"}
                  style={{backgroundColor: '#BB0422'}}>
                Hotels
            </Link>
            <br/>
            <Link className={"btn mt-3 w-50 fw-bold text-white"}  to={"/"}
                  style={{backgroundColor: '#BB0422'}}>
                Destinations
            </Link>
        </div>
    )
}

export default ManageItems;