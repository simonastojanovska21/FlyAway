import React, {Component} from "react";
import AddHotelImages from "../Hotel/admin/addHotelImages";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ImageService from "../../services/ImageService";
import $ from "jquery";
import ConfirmDelete from "../ConfirmDelete/confirmDelete";

class EditRoomImages extends Component{
    constructor(props) {
        super(props);
        this.state={
            images:[]
        }
    }

    render() {
        return(
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center w-75"}>
                    <h3 className="title">Edit images for hotel</h3>
                    <hr/>
                    <div className={"d-flex justify-content-start "}>
                        <div className={"col-6"}>
                            <div className="form-floating">
                                <input type="text" className="form-control shadow-sm border-0 " name="imageUrl"
                                       placeholder="Enter image url for room"
                                       required/>
                                <label htmlFor="imageUrl" className="form-label ps-4">Room image url</label>
                            </div>

                        </div>
                        <button className={"col-3 ms-4 btn text-white"} type={"submit"}
                                onClick={this.onFormSubmit}
                                style={{backgroundColor: '#515153'}}>
                            Add image
                        </button>
                    </div>
                    <h5 className={"text-start pt-3"}>Images already added for room:</h5>
                    <div className={"row pt-3"}>
                        {this.state.images.map((term)=>{
                            return(
                                <div className={"col-3 pe-3"} >
                                    <div className=" card mb-3 shadow p-3 rounded" style={{height:'270px'}}>
                                        <img src={term.url} className={"rounded img-fluid"} alt="hotel room"/>
                                        <div className="card-body">

                                        </div>
                                        <div className="d-grid gap-2 ">
                                            {/*<Link className={"btn mt-2 mb-2 text-white"} style={{backgroundColor: '#BB0422'}}*/}
                                            {/*      onClick={()=>this.deleteImageForRoom(term.id)}>*/}
                                            {/*    <FontAwesomeIcon icon={faTrash} className={"pe-3"}/>Delete*/}
                                            {/*</Link>*/}
                                            <ConfirmDelete itemId={term.id} onDeleteItem={this.deleteImageForRoom} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const roomId=localStorage.getItem("selectedRoomId")
        roomId !== null ? this.getImagesForRoom(roomId) : this.getImagesForRoom(roomId)
    }

    getImagesForRoom=(roomId)=>{
        ImageService.getImagesForRoom(roomId)
            .then((data)=>{
                this.setState({
                    images:data.data
                })
            })
    }

    addImageForRoom=(roomId, imageUrl)=>{
        ImageService.addImageForRoom(roomId,imageUrl)
            .then(()=>{
                this.getImagesForRoom(roomId)
            })
    }

    deleteImageForRoom=(imageId)=>{
        ImageService.deleteImageForRoom(imageId)
            .then(()=>{
                const roomId=localStorage.getItem("selectedRoomId")
                this.getImagesForRoom(roomId)
            })
    }

    onFormSubmit=()=>{
        const imageUrl = $('input[name="imageUrl"]')[0].value
        const roomId=localStorage.getItem("selectedRoomId")
        this.addImageForRoom(roomId, imageUrl);
        $('input[name="imageUrl"]')[0].value=""
    }

}

export default EditRoomImages;