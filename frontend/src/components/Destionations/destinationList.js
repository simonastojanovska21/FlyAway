import React, {Component} from "react";
import DestinationService from "../../services/DestinationService";
import DestinationItem from "./destinationItem";
import {Link} from "react-router-dom";
import {changeTitle} from "react-set-title";

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
                    {
                        localStorage.getItem("userRole") !== null &&
                        localStorage.getItem("userRole").endsWith("ADMIN") &&
                        <Link className={"btn btn-block text-white w-50 mt-3"} style={{backgroundColor: '#8AA6CA'}}
                              to={"/destinations/add"}>
                            Add new destination
                        </Link>
                    }
                    <div className={"row g-3 pt-5"}>
                        {this.state.destinations.length === 0 ? <></> :
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
        changeTitle('Destination list');
        this.getAllDestinations();
        console.log(this.state.destinations)
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