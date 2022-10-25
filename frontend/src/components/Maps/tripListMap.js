import React from "react";
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Modal from 'react-bootstrap/Modal';

let redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = redIcon;

const TripListMap=(props)=>{
    //const coordinates=[35.36951635057235, 24.474487398265133]
    const coordinates=[props.location.latitude, props.location.longitude]
    return (
        <div>
            <Modal
                {...props}
                dialogClassName="modal-90w border-0 rounded-0"
                centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className={"border-0 rounded-0"}>
                    <MapContainer center={coordinates} zoom={16} id={"tripMap"}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={coordinates}>
                            <Popup>
                                <h5>{props.hotelName}</h5>
                                <span>{props.address}</span> <br/>
                                <span>{props.location.city}, {props.location.country}</span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TripListMap;
