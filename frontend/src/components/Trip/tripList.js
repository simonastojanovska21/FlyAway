import React, {Component} from "react";
import Search from "../Search/search";
import TripService from "../../services/TripService";
import TripItem from "./tripItem";
import ReactPaginate from 'react-paginate';
import {faAnglesRight, faAnglesLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TripList extends Component{
    constructor(props) {
        super(props);
        this.state={
            tripsList:[],
            page: 0,
            size:5
        }
    }

    render() {
        const offset=this.state.size * this.state.page;
        const nextPageOffset=offset+this.state.size;
        const pageCount=Math.ceil(this.state.tripsList.length / this.state.size);

        if(this.state.tripsList.length === 0){
            return(
                <div className={"lightBackground pb-5"}>
                    <div className={"container text-center"}>
                        <Search setSearchTrip={this.props.setSearchTrip}/>
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
                    <Search setSearchTrip={this.props.setSearchTrip}/>
                    <h2 className={"fw-bold pt-3"}>Offers matching your search</h2>
                    <div className={"pt-5"} id={"tripsList"}>
                        {this.state.tripsList.map((trip)=>{
                            return(
                                <TripItem trip={trip} setSelectedTripId={this.props.setSelectedTripId} />
                            )
                        }).filter((trip,index)=>{
                            return index>=offset && index<nextPageOffset;
                        })}
                    </div>
                </div>

                <ReactPaginate
                    containerClassName="pagination circlesPagination justify-content-center"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageClassName="page-item"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    nextLabel={<FontAwesomeIcon icon={faAnglesRight} size={"lg"}/>}
                    previousLabel={<FontAwesomeIcon icon={faAnglesLeft} size={"lg"}/>}
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="redActive"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                />
            </div>
        )
    }

    componentDidMount() {
        const location = localStorage.getItem("location");
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

    handlePageClick= (data)=>{
        let selected=data.selected;
        this.setState({
            page:selected
        })
        window.scrollTo(0, 0);
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