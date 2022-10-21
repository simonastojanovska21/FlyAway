import React, {Component} from "react";

class TripList extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return(
            <div className={"lightBackground pt-5 pb-5"}>
                <div className={"container text-center "} style={{width:'50%'}}>
                    <h3 className="title">Trips</h3>

                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    getAllTrips=()=>{

    }
}

export default TripList;