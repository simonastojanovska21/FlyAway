import React, {Component} from "react";
import DestinationService from "../../services/DestinationService";
import Search from "../Search/search";
import DestinationItem from "./destinationItem";

class DestinationList extends Component{
    constructor(props) {
        super(props);
        this.state={
            destinations:[]
        }
    }

    render() {
        return(
            <div className={"lightBackground pb-5"}>
                <div className={"container text-center"}>
                    <h1 className={"fw-bold pt-5"}>Destinations</h1>
                    <div className={"row g-3 pt-5"}>
                        {this.state.destinations === null ? <></> :
                            this.state.destinations.map((term)=>{
                                return(
                                    <DestinationItem destination={term}
                                                     setSelectedDestinationId={this.props.setSelectedDestinationId}
                                                     setSearchTrip={this.props.setSearchTrip}/>
                                )
                            })
                        }
                    </div>


                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getAllDestinations();
    }

    getAllDestinations(){
        DestinationService.getAllDestinations()
            .then((data)=>{
                this.setState({
                    destinations:data.data
                })
            })
    }

}

export default DestinationList;