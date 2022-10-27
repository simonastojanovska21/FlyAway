import React, {Component} from "react";
import DestinationService from "../../services/DestinationService";

class DestinationDetails extends Component{
    constructor(props) {
        super(props);
        this.state={
            destinationDetails:{},
            weatherData:[],

        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }

    componentDidMount() {
        const destinationId = localStorage.getItem("selectedDestinationId")
        this.getDestinationDetails(destinationId);
        this.getWeatherDataForDestinations(destinationId);
    }

    getDestinationDetails=(destinationId)=>{
        DestinationService.getDestinationDetails(destinationId)
            .then((data)=>{
                this.setState({
                    destinationDetails:data.data
                })
            })
    }

    getWeatherDataForDestinations=(destinationId)=>{
        DestinationService.getWeatherDataForDestination(destinationId)
            .then((data)=>{
                this.setState({
                    weatherData:data.data
                })
            })
    }


}

export default DestinationDetails;