import React from "react";
import Modal from "react-bootstrap/Modal";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";

const LeaveHotelReview=(props)=>{

    const [formData, updateFormData] = React.useState({
        stars:1,
        description:"",
    })

    const [leftReview, setLeftReview] = React.useState(false)


    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }


    const onFormSubmit=(e)=>{
        e.preventDefault();
        const stars=formData.stars;
        const description=formData.description;
        const username=localStorage.getItem("username");
        props.onLeaveHotelReview(stars,description,username, props.hotelId);
        setLeftReview(true)
    }

    return(
        <div>
            <Modal
                {...props}
                centered>
                <Modal.Header closeButton>
                    <h3 className={"text-start ps-5 pt-2"}>Leave us a review</h3>
                </Modal.Header>
                <Modal.Body className={"border-0 rounded-0"}>
                    {leftReview &&
                        <div className="p-5">
                            <h3 className={"fw-bold text-start"} style={{color:'#BB0422'}}>
                                Thank you for leaving us a review!
                            </h3>
                        </div> }

                    {!leftReview &&
                    <div>
                        <form className={"row g-3 ps-3 pe-3 pb-3"} onSubmit={onFormSubmit}>
                            <div className="form-group">
                                <ul className="rate-area">
                                    <input type="checkbox" id={"fiveStar"} name="stars" value="5"
                                           onChange={handleChange}/>
                                    <label htmlFor="5-star" title="Amazing" style={{fontSize: '400%'}}>5 stars</label>

                                    <input type="checkbox" id="4-star" name="stars" value="4"
                                           onChange={handleChange}/>
                                    <label htmlFor="4-star" title="Good" style={{fontSize: '400%'}}>4 stars</label>

                                    <input type="checkbox" id="3-star" name="stars" value="3"
                                           onChange={handleChange} />
                                    <label htmlFor="3-star" title="Average" style={{fontSize: '400%'}}>3 stars</label>

                                    <input type="checkbox" id="2-star" name="stars" value="2"
                                           onChange={handleChange}/>
                                    <label htmlFor="2-star" title="Not Good" style={{fontSize: '400%'}}>2 stars</label>

                                    <input type="checkbox" id="1-star" name="stars" value="1"
                                           onChange={handleChange}/>
                                    <label htmlFor="1-star" title="Bad" style={{fontSize: '400%'}}>1 star</label>
                                </ul>
                            </div>

                            <div className="col-md-12 text-start fw-bold">
                                <label htmlFor="username" className="form-label h5">Description</label>
                                <div className="input-group has-validation">
                                     <span className="input-group-text" id="inputGroupEmail">
                                        <FontAwesomeIcon icon={faPencil} size={"lg"}/>
                                    </span>
                                    <textarea name="description" className="form-control" id="review" rows="3" onChange={handleChange}/>
                                </div>
                            </div>

                            <div className={"d-grid gap-2 col-md-12 mt-4"}>
                                <button id="submit" type="submit" className="btn btn-block text-white" style={{backgroundColor: '#8AA6CA'}}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LeaveHotelReview;