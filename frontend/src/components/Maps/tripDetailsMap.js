import React from "react";
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

let redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = redIcon;

const TripDetailsMap=(props)=>{
    //const coordinates=[props.location.latitude, props.location.longitude]

        return(
            <div>
                {props.location.latitude===undefined ? <></> : <>
                    <MapContainer center={[props.location.latitude, props.location.longitude]} zoom={16} id={"tripDetailsMap"} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[props.location.latitude, props.location.longitude]}>
                            <Popup>
                                <h5>{props.location.hotelName}</h5>
                                <span>{props.location.address}</span> <br/>
                                <span>{props.location.city}, {props.location.country}</span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </>  }
            </div>
        )

}

export default TripDetailsMap;