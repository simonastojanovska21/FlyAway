import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import RoomService from "../../services/RoomService";

class EditRoom extends Component{
    constructor(props) {
        super(props);
        this.state={
            roomTypes:[],
            roomId:'',
            room: {},
            pricePerNight: 0,
            numberOfGuests:1,
            roomType:'',
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
                    <h3 className="title">Edit room</h3>
                    <hr/>
                    <form className={"pt-4 text-start"} onSubmit={this.onFormSubmit}>

                        <div className={"row g-4 pb-4"}>
                            <div className="col-md-6 form-floating">
                                <select className="form-select" name="roomType" onChange={this.handleChange} required>
                                    {this.state.roomTypes.map((term)=>{
                                        if(this.state.roomType === term)
                                            return <option selected={this.state.roomType} value={term}>{term}</option>
                                        else
                                            return <option value={term}>{term}</option>
                                        })}
                                </select>
                                <label htmlFor="roomType" className={"form-label ps-4"}>Room type</label>
                            </div>

                            <div className={"col-md-6 form-floating"}>
                                <input type="number" className="form-control shadow-sm border-0 " name="numberOfGuests"
                                       placeholder="Enter maximum number of guests that can stay in the room"
                                       max={5} min={1}
                                       value={this.state.numberOfGuests}
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="numberOfGuests" className="form-label ps-4">Number of guests</label>
                            </div>

                            <div className={"col-md-6 form-floating"}>
                                <input type="number" className="form-control shadow-sm border-0 " name="pricePerNight"
                                       placeholder="Enter the price per night in the room"
                                       value={this.state.pricePerNight}
                                       onChange={this.handleChange}
                                       required/>
                                <label htmlFor="numberGuests" className="form-label ps-4">Price per night (&euro;)</label>
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
        const roomId=localStorage.getItem("selectedRoomId")
        roomId !== null ? this.getRoomDetails(roomId) : this.getRoomDetails(roomId)

        this.getRoomData()
    }

    getRoomData=()=>{
        RoomService.getRoomData()
            .then((data)=>{
                this.setState({
                    roomTypes : data.data
                })
            })
    }

    getRoomDetails=(roomId)=>{
        RoomService.getRoomDetails(roomId)
            .then((data)=>{
                this.setState({
                    roomId:roomId,
                    room:data.data,
                    pricePerNight: data.data.pricePerNight,
                    numberOfGuests:data.data.numberOfGuests,
                    roomType:data.data.roomType
                })
            })
    }

    editRoom=(roomId,pricePerNight,numberOfGuests,roomType)=>{
        RoomService.editRoom(roomId,pricePerNight,numberOfGuests,roomType)
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
    onFormSubmit=(e)=> {
        e.preventDefault();
        const roomType=this.state.roomType;
        const numberOfGuests=this.state.numberOfGuests;
        const pricePerNight=this.state.pricePerNight
        this.editRoom(this.state.roomId,pricePerNight,numberOfGuests,roomType)
    }
}

export default EditRoom;