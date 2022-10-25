import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import Modal from "react-bootstrap/Modal";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const TripImagesCarousel=(props)=>{

    return(
        <Carousel fade indicators={false} interval={null}>
            {props.images.map((image)=>{
                return(
                    <Carousel.Item style={{height:'380px'}}>
                        <img
                            className="d-block w-100 h-100 rounded-2"
                            src={image}
                            alt="First slide"

                        />
                    </Carousel.Item>
                )
            })}
        </Carousel>

    )
}

export default TripImagesCarousel;