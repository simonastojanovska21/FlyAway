import React from "react";

const AddHotelImages=(props)=>{
    return(
        <div className="col-md-6 form-floating">
            <input type="text" className="form-control shadow-sm border-0 " name="imageUrl"
                   placeholder="Enter image url for hotel image"
                   required/>
            <label htmlFor="imagesUrl" className="form-label ps-4">Hotel image url</label>
        </div>
    )
}

export default AddHotelImages;