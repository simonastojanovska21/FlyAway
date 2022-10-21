import React, {Component} from "react";
import HotelService from "../../../services/HotelService";
import {Link} from "react-router-dom";
import ConfirmDelete from "../../ConfirmDelete/confirmDelete";

class HotelAdminList extends Component{
    constructor(props) {
        super(props);
        this.state={
            hotels:[],

        }
    }

    render() {
        return(
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center"}>
                    <h3 className="title">List of hotels</h3>
                    <hr/>

                    <div className="col mt-3 mb-5 text-center">
                        <div className="d-grid gap-2 col-6 mx-auto  ">
                            <Link className={"btn btn-block text-white"} style={{backgroundColor: '#8AA6CA'}}
                                  to={"/admin/hotels/add"}>
                                Add new hotel
                            </Link>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Hotel name</th>
                            <th>City</th>
                            <th>Rooms</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.hotels.map((term)=>{
                            return(
                                <tr>
                                    <td className={"align-middle fw-bold"}>{term.hotelName}</td>
                                    <td className={"align-middle"}>{term.hotelCity}</td>
                                    <td className={"align-middle"}>
                                        <ul className={"list-unstyled"}>
                                            {Object.entries(term.roomTypesCount).map((each)=>{
                                                return(
                                                    <li>{each[0]} rooms: {each[1]}</li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                    <td className={"text-end align-middle"}>
                                        <Link className={"btn me-3"} style={{backgroundColor: '#8AA6CA'}}
                                              onClick={()=>this.props.setSelectedHotelId(term.hotelId,term.hotelName)} to={"/admin/rooms/add"}>
                                            Add new room
                                        </Link>
                                        <Link className={"btn me-3"} style={{backgroundColor: '#8AA6CA'}}
                                              onClick={()=>this.props.setSelectedHotelId(term.hotelId,term.hotelName)}
                                              to={`/admin/rooms/roomsInHotel/${term.hotelId}`}>
                                            View room list
                                        </Link>
                                        <br />
                                        <Link className={"btn text-white me-3 mt-3"} style={{backgroundColor: '#515153'}}
                                              onClick={()=>this.props.setSelectedHotelId(term.hotelId,term.hotelName)}
                                                to={`/admin/hotels/edit/${term.hotelId}`}>
                                            Edit hotel
                                        </Link>
                                        <Link className={"btn text-white me-3 mt-3"} style={{backgroundColor: '#515153'}}
                                              onClick={()=>this.props.setSelectedHotelId(term.hotelId,term.hotelName)}
                                              to={`/admin/hotels/imagesForHotel/${term.hotelId}`}>
                                            Edit hotel images
                                        </Link>
                                        <br/>
                                        {/*<button className={"btn text-white me-3 mt-3"} style={{backgroundColor: '#BB0422'}}*/}
                                        {/*    onClick={()=>this.deleteHotel(term.hotelId)}>*/}
                                        {/*    Delete hotel*/}
                                        {/*</button>*/}
                                        <ConfirmDelete itemId={term.hotelId} onDeleteItem={this.deleteHotel} />
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
        this.getAdminHotelList();
    }
    getAdminHotelList=()=>{
        HotelService.getAdminHotelList()
            .then((data)=>{
                this.setState({
                    hotels:data.data
                })
            })
    }

    deleteHotel=(hotelId)=>{
        HotelService.deleteHotel(hotelId)
            .then(()=>{
                this.getAdminHotelList()
            })
    }
}

export default HotelAdminList;