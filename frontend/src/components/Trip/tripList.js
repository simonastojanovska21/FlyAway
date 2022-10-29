import React, {Component} from "react";
import Search from "../Search/search";
import TripService from "../../services/TripService";
import TripItem from "./tripItem";

class TripList extends Component{
    constructor(props) {
        super(props);
        this.state={
            tripsList:[]
        }
    }

    render() {
        if(this.state.tripsList.length === 0){
            return(
                <div className={"lightBackground pb-5"}>
                    <div className={"container text-center"}>
                        <Search />
                        <h2 className={"fw-bold pt-3"}>We are sorry, but we could not find trips matching you criteria.
                        <br/>
                            Try with different search words.
                        </h2>
                    </div>
                </div>
            )
        }
        return(
            <div className={"lightBackground pb-5"}>
                <div className={"container text-center"}>
                    <Search />
                    <h2 className={"fw-bold pt-3"}>Offers matching your search</h2>
                    <div className={"pt-5"} id={"tripsList"}>
                        {this.state.tripsList.map((trip)=>{
                            return(
                                <TripItem trip={trip} setSelectedTripId={this.props.setSelectedTripId} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const location = localStorage.getItem("location");
        console.log(location)
        const startDate = localStorage.getItem("startDate");
        const endDate = localStorage.getItem("endDate")
        if(location !== null && startDate !== null)
            this.getAllTripsForLocationAndDate(location, startDate, endDate);
        else if(location === null && startDate !== null)
            this.getAllTripsForDate(startDate, endDate);
        else if(location !== null && startDate === null)
            this.getAllTripsForLocation(location);
        else
            this.getAllTrips();

    }

    getAllTrips=()=>{
        TripService.getAllTrips()
            .then((data)=>{
                this.setState({
                    tripsList:data.data
                })
            })
    }

    getAllTripsForLocationAndDate=(location, startDate, endDate)=>{
        TripService.getAllTripsForLocationAndDate(location,startDate,endDate)
            .then((data)=>{
                this.setState({
                    tripsList:data.data
                })
            })
    }

    getAllTripsForLocation=(locations)=>{
        TripService.getAllTripsForLocation(locations)
            .then((data)=>{
                this.setState({
                    tripsList:data.data
                })
            })
    }

    getAllTripsForDate=(startDate, endDate)=>{
        TripService.getAllTripsForDate(startDate,endDate)
            .then((data)=>{
                this.setState({
                    tripsList:data.data
                })
            })
    }

}

export default TripList;