import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";

const LeaveReview=(props)=>{

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

        props.onLeaveReview(stars,description,props.username);
        setLeftReview(true)
    }

    if(leftReview){
        return (
            <div className="ps-5 pe-5 pt-3">
                <h1 className={"fw-bold text-start"} style={{color:'#BB0422'}}>
                    Thank you for leaving us a review!
                </h1>
            </div>
        )
    }

    return(
        <div className="ps-5 pe-5" id={"leaveReview"}>
            <form id={"reviewForm"} className={"row g-3 p-5"} onSubmit={onFormSubmit}>
                <h3 className={"text-start"}>Leave us a review</h3>
                <hr/>
                <br/>
                <div className="form-group">
                    <ul className="rate-area">
                        <input type="checkbox" id={"5-star"} name="stars" value="5"
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
        </div>
    )
}

export default LeaveReview;