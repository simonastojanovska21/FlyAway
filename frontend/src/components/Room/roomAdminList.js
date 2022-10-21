import React, {Component} from "react";
import RoomService from "../../services/RoomService";
import {Link} from "react-router-dom";
import ConfirmDelete from "../ConfirmDelete/confirmDelete";

class RoomAdminList extends Component{
    constructor(props) {
        super(props);
        this.state={
            roomsList:[]
        }
    }

    render(){

        return(
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center"}>
                    <h3 className="title">List of rooms in hotel  <span className={"text-decoration-underline"} style={{color: '#515153'}}>{this.props.selectedHotelName}</span> </h3>
                    <hr/>

                    <div className="col mt-3 mb-5 text-center">
                        <div className="d-grid gap-2 col-6 mx-auto  ">
                            <Link className={"btn btn-block text-white"} style={{backgroundColor: '#8AA6CA'}}
                                  to={"/admin/rooms/add"}>
                                Add new room
                            </Link>
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Room number</th>
                            <th>Room type</th>
                            <th>Price per night (&euro;)</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.roomsList.map((term)=>{
                            return(
                                <tr>
                                    <td className={"align-middle fw-bold"}>{term.roomNumber}</td>
                                    <td className={"align-middle"}>{term.roomType}</td>
                                    <td className={"align-middle"}>{term.pricePerNight}</td>
                                    <td className={"text-end align-middle"}>

                                        <Link className={"btn text-white me-3"} style={{backgroundColor: '#515153'}}
                                              onClick={()=>this.props.setSelectedRoomId(term.id)}
                                              to={`/admin/rooms/edit/${term.id}`}>
                                            Edit room
                                        </Link>
                                        <Link className={"btn text-white me-3"} style={{backgroundColor: '#515153'}}
                                              onClick={()=>this.props.setSelectedRoomId(term.id)}
                                              to={`/admin/rooms/imagesForRoom/${term.id}`}>
                                            Edit room images
                                        </Link>
                                        <br/>
                                        <Link className={"btn me-3 mt-3"} style={{backgroundColor: '#8AA6CA'}}>
                                            Check availability
                                        </Link>
                                        <ConfirmDelete itemId={term.id} onDeleteItem={this.deleteRoom} />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>


                </div>
            </div>
        )
    }

    componentDidMount() {
        const hotelId=localStorage.getItem("selectedHotelId");
        hotelId !== null ? this.getRoomsInHotel(hotelId) : this.getRoomsInHotel(this.props.selectedHotelId)

    }

    getRoomsInHotel=(hotelId)=>{
        RoomService.getRoomsInHotel(hotelId)
            .then((data)=>{
                this.setState({
                    roomsList : data.data
                })
            })
    }

    deleteRoom=(roomId)=>{
        RoomService.deleteRoom(roomId)
            .then(()=>{
                this.getRoomsInHotel(localStorage.getItem("selectedHotelId"))
            })
    }
}

export default RoomAdminList;