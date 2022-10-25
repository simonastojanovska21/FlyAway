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

}

export default TripList;