import React from "react";
import {Navigate} from "react-router-dom";
import DestinationService from "../../services/DestinationService";

const AddDestination=(props)=>{

    const [formData, updateFormData] = React.useState({
        city:"",
        country:"",
        destinationImage: "",
        destinationThumbnail: ""
    })
    const [redirectToLocation,setRedirectToLocation] = React.useState(false);


    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();

        const city = formData.city;
        const country = formData.country;
        const destinationImage = formData.destinationImage;
        const destinationThumbnail = formData.destinationThumbnail;

        DestinationService.addNewDestination(city,country,destinationImage, destinationThumbnail)
            .then(()=>{
                setRedirectToLocation(true)
            })

    }
    if(redirectToLocation){
        return (
            <Navigate to={"/"} />
        )
    }

    return(
        <div className={"lightBackground pt-5 pb-5"}>
            <div className={"container text-center"} style={{width:'65%'}}>
                <h3 className="title">Add new destination</h3>
                <hr/>
                <form className={"pt-4 text-start"} onSubmit={onFormSubmit}>
                    <div className={"row g-4 pb-4"}>
                        <div className="col-md-6 form-floating ">
                            <input type="text" className="form-control shadow-sm border-0 " name="city"
                                   placeholder="Enter the city in which the hotel is located"
                                   onChange={handleChange}
                                   required/>
                            <label htmlFor="city" className="form-label ps-4">City</label>

                        </div>
                        <div className="col-md-6 form-floating ">
                            <input type="text" className="form-control shadow-sm border-0 " name="country"
                                   placeholder="Enter the country in which the hotel is located"
                                   onChange={handleChange}
                                   required/>
                            <label htmlFor="country" className="form-label ps-4">Country</label>
                        </div>
                        <div className="col-md-6 form-floating ">
                            <input type="text" className="form-control shadow-sm border-0 " name="destinationImage"
                                   placeholder="Enter cover image for the destination"
                                   onChange={handleChange}
                                   required/>
                            <label htmlFor="destinationImage" className="form-label ps-4">Destination cover image</label>
                        </div>
                        <div className="col-md-6 form-floating ">
                            <input type="text" className="form-control shadow-sm border-0 " name="destinationThumbnail"
                                   placeholder="Enter thumbnail image for the destination"
                                   onChange={handleChange}
                                   required/>
                            <label htmlFor="destinationThumbnail" className="form-label ps-4">Destination thumbnail image</label>
                        </div>
                    </div>
                    <div className={"d-grid gap-2 col-md-8 mx-auto pt-3"}>
                        <button  type="submit" className="btn btn-block text-white"
                                 style={{backgroundColor: '#8AA6CA'}}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDestination;