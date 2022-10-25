import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";

const AllHotelImages=(props)=>{
    return(
        <div>
            <Modal
                {...props}
                dialogClassName="modal-60w border-0 rounded-0"
                centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className={"border-0 rounded-0"}>
                    <Carousel fade indicators={false} interval={null}>
                        {props.images.map((image)=>{
                            return(
                                <Carousel.Item style={{height:'500px'}}>
                                    <img
                                        className="d-block w-100 h-100 rounded-2"
                                        src={image}
                                        alt="Hotel images"

                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default AllHotelImages;