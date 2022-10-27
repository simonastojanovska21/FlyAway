import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import AddHotelImages from "../Hotel/addHotelImages";
import $ from "jquery";
import RoomService from "../../services/RoomService";

class AddRoom extends Component{
    constructor(props) {
        super(props);
        this.state={
            roomTypes:[],
            numberOfAvailableRooms:0,
            roomType:"",
            numberOfGuests:1,
            pricePerNight:0,
            imagesUrl:[],
            imageComponents:0,
            redirect:false
        }
    }

    render() {
        if(this.state.redirect){
            return(
                <Navigate to={"/admin/hotels"} />
            )
        }
        return (
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center"} style={{width:'65%'}}>
                    <h3 className="title">Add new room</h3>
                    <hr/>
                    <form className={"pt-4 text-start"} onSubmit={this.onFormSubmit}>

                        <div className={"row g-4 pb-4"}>
                            <div className="col-md-6 form-floating ">
                                <input type="text" className="form-control shadow-sm border-0 " name="numberOfAvailableRooms"
                                       placeholder="Enter room number"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="numberOfAvailableRooms" className="form-label ps-4">Room number</label>

                            </div>
                            <div className="col-md-6 form-floating">
                                <select className="form-select" name="roomType" onChange={this.handleChange} required>
                                    {this.state.roomTypes.map((term)=>
                                        <option value={term}>{term}</option>
                                    )}
                                </select>
                                <label htmlFor="roomType" className={"form-label ps-4"}>Room type</label>
                            </div>

                            <div className={"col-md-6 form-floating"}>
                                <input type="number" className="form-control shadow-sm border-0 " name="numberOfGuests"
                                       placeholder="Enter maximum number of guests that can stay in the room"
                                       max={5} min={1}
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="numberOfGuests" className="form-label ps-4">Number of guests</label>
                            </div>

                            <div className={"col-md-6 form-floating"}>
                                <input type="number" className="form-control shadow-sm border-0 " name="pricePerNight"
                                       placeholder="Enter the price per night in the room"
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="numberGuests" className="form-label ps-4">Price per night (&euro;)</label>
                            </div>
                        </div>

                        <h5 className={"col-3"}>Images urls:</h5>
                        <button name="quantity" className={"btn"} type="button" onClick={this.handlePlusClick}
                                style={{backgroundColor: '#8AA6CA', color: '#f3f7f0'}}>
                            <FontAwesomeIcon icon={faPlus} />
                            <br/>
                        </button>
                        <button name="quantity" className={"btn btn-minus ms-3"} type="button" onClick={this.handleMinusClick}
                                style={{backgroundColor: '#8AA6CA', color: '#f3f7f0'}} >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>

                        <div id={"roomImages"}>
                            <div className={"text-start pt-3 row g-4"}>
                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control shadow-sm border-0 " name="imageUrl"
                                           placeholder="Enter image url for room"
                                           required/>
                                    <label htmlFor="imagesUrl" className="form-label ps-4">Room image url</label>
                                </div>

                            {Array.apply(null,{length:this.state.imageComponents})
                                .map((t)=>
                                    <div className="col-md-6 form-floating">
                                        <input type="text" className="form-control shadow-sm border-0 " name="imageUrl"
                                           placeholder="Enter image url for room"
                                           required/>
                                        <label htmlFor="imagesUrl" className="form-label ps-4">Room image url</label>
                                    </div>)}
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
        this.getRoomData();
    }

    getRoomData=()=>{
        RoomService.getRoomData()
            .then((data)=>{
                this.setState({
                    roomTypes : data.data
                })
            })
    }

    addNewRoomForHotel=(numberOfAvailableRooms,pricePerNight,numberOfGuests,roomType,hotelId,imagesUrl)=>{
        RoomService.addNewRoom(numberOfAvailableRooms,pricePerNight,numberOfGuests,roomType,hotelId,imagesUrl)
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
        let imagesUrl=[]
        $('input[name="imageUrl"]').each(function (){
            imagesUrl.push(this.value)
        })
        console.log(imagesUrl)

        const numberOfAvailableRooms=this.state.numberOfAvailableRooms;
        const roomType=this.state.roomType;
        const numberOfGuests=this.state.numberOfGuests;
        const pricePerNight=this.state.pricePerNight

        this.addNewRoomForHotel(numberOfAvailableRooms,pricePerNight,numberOfGuests,roomType,localStorage.getItem("selectedHotelId"),imagesUrl)
    }
}

export default AddRoom;