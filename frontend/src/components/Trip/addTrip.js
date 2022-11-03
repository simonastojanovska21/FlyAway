import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import HotelService from "../../services/HotelService";
import RoomService from "../../services/RoomService";
import $ from "jquery";
import moment from 'moment';
import AddTripDatePicker from "../DatePicker/addTripDatePicker";
import TripService from "../../services/TripService";
import {changeTitle} from "react-set-title";

class AddTrip extends Component{
    constructor(props) {
        super(props);
        this.state={
            hotelsList:[],
            roomTypesAndPrice:[],
            pricesList:new Map(),
            showRoomTypes:false,
            hotelId:'',
            hotelMessage:false,
            startDateMessage:false,
            endDateMessage:false,
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
                <div className={"container text-center "} style={{width:'50%'}}>
                    <h3 className="title">Add new trip</h3>
                    <hr/>
                    <form className={"pt-4 text-start form-floating"} onSubmit={this.onFormSubmit}>
                        <div className={"row g-4 pb-4"}>
                            <div className=" form-floating">
                                <select className="form-select" name="roomType" onChange={this.handleHotelsChange} required>
                                    <option>Select hotel name for trip</option>
                                    {this.state.hotelsList.map((term)=>
                                        <option value={term.hotelId}>{term.hotelName}</option>
                                    )}
                                </select>
                                <label htmlFor="roomType" className={"form-label ps-4"}>Hotels names</label>
                                {this.state.hotelMessage &&
                                    <span className={"text-danger fst-italic"}>Select the hotel for the trip</span>
                                }
                            </div>
                        </div>

                        {this.state.showRoomTypes &&
                            this.state.roomTypesAndPrice.map((room)=>{
                                return(
                                    <div className={"row pb-3"}>
                                        <div className={"col-4 text-end pt-3"}>
                                            <h4>{room.roomType} room</h4>
                                        </div>
                                        <div className={"col-8 form-floating"}>
                                            <input type="number" className="form-control shadow-sm border-0 " name={room.roomType}
                                                   placeholder="0.0"
                                                   value={this.state.pricesList.get(room.roomType)}
                                                   onChange={()=>this.handlePriceChange(room.roomType)}
                                                   required/>
                                            <label htmlFor="numberGuests" className="form-label ps-4">Price per night (&euro;)</label>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className={"row g-4 pb-4"}>
                            <div className={"col-6 customTripDatePickerWidth"}>
                                <AddTripDatePicker elementId={"startDate"} elementPlaceholder={"Start date"}/>
                                {this.state.startDateMessage &&
                                    <span className={"text-danger fst-italic"}>Enter the start date of the trip</span>
                                }
                            </div>
                            <div className={"col-6 customTripDatePickerWidth"}>
                                <AddTripDatePicker elementId={"endDate"} elementPlaceholder={"End date"} />
                                {this.state.endDateMessage &&
                                    <span className={"text-danger fst-italic"}>Enter the end date of the trip</span>
                                }
                            </div>
                        </div>



                        <div className={"d-grid gap-2 col-md-8 mx-auto"}>
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
        changeTitle('Add trip');
        this.getHotelsNameAndId();
    }


    getHotelsNameAndId=()=>{
        HotelService.getHotelsNameAndId()
            .then((data)=>{
                this.setState({
                    hotelsList: data.data
                })
            })
    }

    getRoomTypesAndPriceInHotel=(hotelId)=>{
        RoomService.getRoomTypesAndPriceInHotel(hotelId)
            .then((data)=>{
                let map=new Map();
                data.data.forEach(each=>map.set(each.roomType,each.price))
                this.setState({
                    hotelId:hotelId,
                    roomTypesAndPrice: data.data,
                    pricesList:map,
                    showRoomTypes:true
                })
            })
    }

    addNewTrip=(hotelId,roomTypePrice,startDate,endDate)=>{
        //console.log(roomTypePrice.fo)
        let finalMap={};
        roomTypePrice.forEach((value, key)=>{
            finalMap[key]=value
        })
        TripService.addNewTrip(hotelId,finalMap,startDate,endDate)
            .then(()=>{
                this.setState({
                    redirect:true
                })
            })
    }

    handlePriceChange=(roomType)=>{
        const newPrice = $('input[name='+roomType+']')[0].value;
        let map=this.state.pricesList;
        map.set(roomType,parseFloat(newPrice));
        this.setState({
            pricesList:map
        })
    }

    handleHotelsChange=(e)=>{
        const hotelId=e.target.value
        this.getRoomTypesAndPriceInHotel(hotelId)
    }

    onFormSubmit=(e)=>{
        e.preventDefault();
        if(this.state.hotelId === ''){
            this.setState({
                hotelMessage:true
            })
            return;
        }
        const startArray = $('#startDate')[0].value.split('-')
        if(startArray[0]===''){
            this.setState({
                startDateMessage:true
            })
            return;
        }
        const startDate=startArray[2]+"-"+startArray[1]+'-'+startArray[0]
        const endArray = $('#endDate')[0].value.split('-')
        if(endArray[0]===''){
            this.setState({
                endDateMessage:true
            })
            return;
        }
        const endDate=endArray[2]+"-"+endArray[1]+'-'+endArray[0]

        this.addNewTrip(this.state.hotelId,this.state.pricesList,startDate,endDate)
    }
}

export default AddTrip;