import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import HotelService from "../../../services/HotelService";
import $ from "jquery";

class EditHotel extends Component{
    constructor(props) {
        super(props);
        this.state={
            amenities:[],
            hotel:{},
            selectedAmenities:[],
            name:"",
            description:"",
            checkInHour:"",
            checkOutHour:"",
            stars:0,
            redirect:false
        }
    }

    render() {

        if(this.state.redirect){
            return (
                <Navigate to={"/admin/hotels"} />
            )
        }


        return(
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center"} style={{width:'65%'}}>
                    <h3 className="title">Edit hotel</h3>
                    <hr/>
                    <form className={"pt-4 text-start"} onSubmit={this.onFormSubmit}>

                        <div className={"row g-4 pb-4"}>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 "  name="name"
                                       placeholder="Enter hotel name"
                                       onChange={this.handleChange}
                                       value={this.state.name}
                                       required/>
                                <label htmlFor="name" className="form-label ps-4">Hotel name</label>

                            </div>
                            <div className={"col-md-6 form-floating"}>
                                <input type="number" className="form-control shadow-sm border-0 " name="stars"
                                       placeholder="Enter number of stars the hotel has"
                                       max={5} min={1}
                                       value={this.state.stars}
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="stars" className="form-label ps-4">Number of stars</label>
                            </div>

                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="checkInHour"
                                       placeholder="Enter hotel check in hour"
                                       value={this.state.checkInHour}
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="checkInHour" className="form-label ps-4">Check in hour</label>

                            </div>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="checkOutHour"
                                       placeholder="Enter hotel check out hour"
                                       value={this.state.checkOutHour}
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
                                                <input className={"me-2 "} value={term} type="checkbox"
                                                       checked={this.state.selectedAmenities.includes(term)}
                                                       onChange={this.handleAmenitiesChange}
                                                       name="amenities"/>
                                                <span>{ term }</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="col-md-12 form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here"
                                      name="description" style={{height:'150px'}}
                                      value={this.state.description}
                                      onChange={this.handleChange}/>
                                <label htmlFor="description" className={"form-label ps-4"}>Description</label>
                            </div>
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
        const hotelId=localStorage.getItem("selectedHotelId");
        hotelId !== null ? this.getHotelDetails(hotelId) : this.getHotelDetails(this.props.selectedHotelId)

        this.getHotelData()

        //this.getHotelDetails('c07018fd-42e0-44f6-b42d-5a20cdbb55f4')
    }

    getHotelData=()=>{
        HotelService.getHotelData()
            .then((data)=>{
                this.setState({
                    amenities:data.data.amenities
                })
            })
    }
    getHotelDetails=(hotelId)=>{
        HotelService.getHotelDetails(hotelId)
            .then((data)=>{
                this.setState({
                    hotelId:hotelId,
                    hotel:data.data,
                    selectedAmenities:data.data.amenities.split(","),
                    name:data.data.name,
                    description:data.data.description,
                    checkInHour:data.data.checkInHour,
                    checkOutHour:data.data.checkOutHour,
                    stars:data.data.stars
                })
            })
    }
    editHotel=(hotelId,name, description, amenities, checkInHour, checkOutHour,stars)=>{
        HotelService.editHotel(hotelId,name, description, amenities, checkInHour, checkOutHour,stars)
            .then(()=>{
                this.setState({
                    redirect:true
                })
            })
    }

    handleChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    handleAmenitiesChange=(e)=>{
        let tmp = this.state.selectedAmenities;
        if(tmp.includes(e.target.value)) {
            tmp = tmp.filter(function(item) { return item !== e.target.value })
        }
        else {
            tmp.push(e.target.value)
        }
        this.setState({
            selectedAmenities:tmp
        })
    }

    onFormSubmit=(e)=>{
        e.preventDefault();
        let selectedAmenities=[]
        $('input[name="amenities"]:checked').each(function (){
            selectedAmenities.push(this.value)
        })

        const name=this.state.name;
        const description=this.state.description;
        const amenities = selectedAmenities.toString();
        const checkInHour=this.state.checkInHour
        const checkOutHour=this.state.checkOutHour
        const stars = this.state.stars;

        this.editHotel(this.state.hotelId,name, description, amenities, checkInHour, checkOutHour, stars)
    }
}

export default EditHotel;