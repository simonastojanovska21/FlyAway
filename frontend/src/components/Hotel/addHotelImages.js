import React from "react";

const AddHotelImages=(props)=>{
    return(
        <div className={"text-start pt-3 row g-4"}>
            <div className="col-md-6 form-floating">
                <input type="text" className="form-control shadow-sm border-0 " name="imageUrl"
                       placeholder="Enter image url for hotel image"
                       required/>
                <label htmlFor="imagesUrl" className="form-label ps-4">Hotel image url</label>
            </div>
            <div className="col-md-6 form-floating">
                <select className="form-select" name="imageTag" >
                    {props.imageTags.map((term)=>
                        <option value={term}>{term}</option>
                    )}
                </select>
                <label htmlFor="imageTag" className={"form-label ps-4"}>Image tag</label>
            </div>
        </div>
    )
}

export default AddHotelImages;