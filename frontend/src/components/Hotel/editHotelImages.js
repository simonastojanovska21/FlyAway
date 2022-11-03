import React, {Component} from "react";
import {Link, Navigate} from "react-router-dom";
import HotelService from "../../services/HotelService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import AddHotelImages from "./addHotelImages";
import ImageService from "../../services/ImageService";
import $ from "jquery";
import ConfirmDelete from "../ConfirmDelete/confirmDelete";
import {changeTitle} from "react-set-title";

class EditHotelImages extends Component{

    constructor(props) {
        super(props);
        this.state={
            images:[],
        }
    }

    render() {

        return (
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center w-75"}>
                    <h3 className="title">Edit images for hotel</h3>
                    <hr/>
                    <div className={"d-flex justify-content-start "}>
                        <div className={"col-8"}>
                            <AddHotelImages  />
                        </div>
                        <button className={"col-3 ms-4 mt-3 btn text-white"} type={"submit"}
                                onClick={this.onFormSubmit}
                                style={{backgroundColor: '#515153'}}>
                            Add image
                        </button>
                    </div>
                    <h5 className={"text-start pt-3"}>Images already added for hotel:</h5>
                    <div className={"row pt-3"}>
                        {this.state.images.map((term)=>{
                            return(
                                <div className={"col-3 pe-3"} >
                                    <div className=" card mb-3 shadow p-3 rounded" style={{height:'300px'}}>
                                        <img src={term.url} className={"rounded"} alt="hotel room"/>
                                        <div className="card-body">
                                            <span></span>
                                        </div>
                                        <div className="d-grid gap-2 ">
                                            {/*<Link className={"btn mt-2 mb-2 text-white"} style={{backgroundColor: '#BB0422'}}*/}
                                            {/*    onClick={()=>this.deleteImageForHotel(term.id)}>*/}
                                            {/*    <FontAwesomeIcon icon={faTrash} className={"pe-3"}/>Delete*/}
                                            {/*</Link>*/}
                                            <ConfirmDelete itemId={term.id} onDeleteItem={this.deleteImageForHotel} />
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
        changeTitle('Edit hotel images');
        const hotelId=localStorage.getItem("selectedHotelId");
        hotelId !== null ? this.getImagesForHotel(hotelId) : this.getImagesForHotel(this.props.selectedHotelId)

        this.getHotelData()
    }

    getHotelData=()=>{
        HotelService.getHotelData()
            .then((data)=>{
                this.setState({
                    imageTags:data.data.imageTags
                })
            })
    }

    getImagesForHotel=(hotelId)=>{
        ImageService.getImagesForHotel(hotelId)
            .then((data)=>{
                this.setState({
                    images:data.data
                })
            })
    }

    addImageForHotel=(hotelId, imageUrl)=>{
        ImageService.addImageForHotel(hotelId,imageUrl)
            .then(()=>{
                this.getImagesForHotel(hotelId)
            })
    }

    deleteImageForHotel=(imageId)=>{
        ImageService.deleteImageForHotel(imageId)
            .then(()=>{
                const hotelId=localStorage.getItem("selectedHotelId");
                this.getImagesForHotel(hotelId)
            })
    }

    onFormSubmit=()=>{
        const imageUrl = $('input[name="imageUrl"]')[0].value

        const hotelId=localStorage.getItem("selectedHotelId");
        this.addImageForHotel(hotelId, imageUrl);
        $('input[name="imageUrl"]')[0].value=""
    }

}

export default EditHotelImages;