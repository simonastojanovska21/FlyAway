import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import HotelService from "../../../services/HotelService";
import AddHotelImages from "./addHotelImages";
import {Navigate} from "react-router-dom";

class AddHotel extends Component{

    constructor(props) {
        super(props);
        this.state={
            amenities:[],
            imageTags:[],
            name:"",
            description:"",
            address:"",
            city:"",
            country:"",
            checkInHour:"",
            checkOutHour:"",
            latitude:"",
            longitude:"",
            stars:0,
            imageComponents:0,
            redirect:false
        }
    }

    render() {
        if(this.state.redirect){
            return (
                <Navigate to={"/"} />
            )
        }
        return(
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center"} style={{width:'65%'}}>
                    <h3 className="title">Add new hotel</h3>
                    <hr/>
                    <form className={"pt-4 text-start"} onSubmit={this.onFormSubmit}>

                        <div className={"row g-4 pb-4"}>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 "  name="name"
                                       placeholder="Enter hotel name"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="name" className="form-label ps-4">Hotel name</label>

                            </div>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="address"
                                       placeholder="Enter hotel address"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="address" className="form-label ps-4">Address</label>
                            </div>

                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="city"
                                       placeholder="Enter the city in which the hotel is located"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="city" className="form-label ps-4">City</label>

                            </div>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="country"
                                       placeholder="Enter the country in which the hotel is located"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="country" className="form-label ps-4">Country</label>
                            </div>

                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="latitude"
                                       placeholder="Enter latitude of the hotel location"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="latitude" className="form-label ps-4">Latitude</label>

                            </div>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="longitude"
                                       placeholder="Enter longitude of the hotel location"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="longitude" className="form-label ps-4">Longitude</label>
                            </div>

                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="checkInHour"
                                       placeholder="Enter hotel check in hour"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="checkInHour" className="form-label ps-4">Check in hour</label>

                            </div>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="checkOutHour"
                                       placeholder="Enter hotel check out hour"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="checkOutHour" className="form-label ps-4">Check out hour</label>
                            </div>

                            <div className={"col-md-12 ps-3"}>
                                <label htmlFor={"amenities"} className={"form-label pb-2 fw-bold"}>Amenities for hotel:</label>
                                <ul className={"list-unstyled row"}>
                                    {this.state.amenities.map((term)=>{
                                        return(
                                            <li className={"col-3"} value={term} key={ term } >
                                                <input className={"me-2 "} value={term} type="checkbox" name="amenities"/>
                                                <span>{ term }</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className={"col-md-6 form-floating"}>
                                <input type="number" className="form-control shadow-sm border-0 " name="stars"
                                       placeholder="Enter number of stars the hotel has"
                                       max={5} min={1}
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="stars" className="form-label ps-4">Number of stars</label>
                            </div>

                            <div className="col-md-12 form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here"
                                      name="description" style={{height:'150px'}} onChange={this.handleChange}/>
                                <label htmlFor="description" className={"form-label ps-4"}>Description</label>
                            </div>
                        </div>


                        <OverlayTrigger
                            placement="right"
                            delay={{ hide: 400 }}
                            overlay={<Tooltip id="button-tooltip-img">You should add 1 cover image for the hotel.
                                Other images are optional and should be added with a tag.</Tooltip>}>
                            <h5 className={"col-3"}>Images urls: <FontAwesomeIcon icon={faCircleQuestion} className={"ms-2"}/></h5>
                        </OverlayTrigger>

                        <button name="quantity" className={"btn"} type="button" onClick={this.handlePlusClick}
                                style={{backgroundColor: '#8AA6CA', color: '#f3f7f0'}}>
                            <FontAwesomeIcon icon={faPlus} />
                            <br/>
                        </button>
                        <button name="quantity" className={"btn btn-minus ms-3"} type="button" onClick={this.handleMinusClick}
                                style={{backgroundColor: '#8AA6CA', color: '#f3f7f0'}} >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div id={"hotelImages"}>
                            <div className={"text-start pt-3 row g-4"}>
                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control shadow-sm border-0 " name="imageUrl"
                                           placeholder="Enter image url for hotel cover"
                                           required/>
                                    <label htmlFor="imagesUrl" className="form-label ps-4">Hotel cover image url</label>
                                </div>
                                <div className="col-md-6 form-floating">
                                    <select className="form-select" name="imageTag" disabled >
                                        <option value="Cover">Cover</option>
                                    </select>
                                    <label htmlFor="imageTag" className={"form-label ps-4"}>Image tag</label>
                                </div>
                            </div>

                            {Array.apply(null, {length: this.state.imageComponents})
                                .map((t)=><AddHotelImages imageTags={this.state.imageTags} /> )}
                        </div>

                        <div className={"d-grid gap-2 col-md-8 mx-auto pt-5"}>
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

    componentDidMount() {
        this.getHotelData()
    }

    getHotelData=()=>{
        HotelService.getHotelData()
            .then((data)=>{
                this.setState({
                    amenities:data.data.amenities,
                    imageTags:data.data.imageTags
                })
            })
    }

    addNewHotel=(name, description, address, city, country, amenities, checkInHour, checkOutHour, latitude, longitude,stars, imagesUrl)=>{
        HotelService.addNewHotel(name, description, address, city, country, amenities, checkInHour, checkOutHour, latitude, longitude, stars,imagesUrl)
            .then(()=>{
                this.setState({
                    ...this.state,
                    redirect:true
                })
            })
    }

    handleChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value.trim()
        })
    }

    handlePlusClick = (e) => {
        this.setState({
            ...this.state,
            imageComponents : this.state.imageComponents+1
        })
    };

    handleMinusClick = (e) => {
        if(this.state.imageComponents > 0){
            this.setState({
                ...this.state,
                imageComponents : this.state.imageComponents-1
            })
        }
    };

    onFormSubmit=(e)=>{
        e.preventDefault();
        let selectedAmenities=[]
        $('input[name="amenities"]:checked').each(function (){
            selectedAmenities.push(this.value)
        })
        let imagesTags=[]
        $('select[name="imageTag"] option:selected').each(function (){
            imagesTags.push(this.value)
        })
        let imagesUrl=[]
        $('input[name="imageUrl"]').each(function (index){
            let image = {"imageUrl":this.value, "imageTag":imagesTags[index] }
            imagesUrl.push(image)
        })

        const name=this.state.name;
        const description=this.state.description;
        const address=this.state.address;
        const city=this.state.city
        const country=this.state.country
        const amenities = selectedAmenities.toString();
        const checkInHour=this.state.checkInHour
        const checkOutHour=this.state.checkOutHour
        const latitude=this.state.latitude
        const longitude=this.state.longitude
        const stars = this.state.stars;

        this.addNewHotel(name, description, address, city, country, amenities, checkInHour, checkOutHour,
            latitude, longitude,stars, imagesUrl)
    }

}

export default AddHotel;