import React, {Component} from "react";
import DestinationService from "../../services/DestinationService";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import $ from 'jquery';
import WeatherForecast from "./weatherForecast";
import Loading from "../App/loading";
import TouristAttractionItem from "./touristAttractionItem";
import DestinationAttractionsMap from "../Maps/destinationAttractionsMap";
import TripService from "../../services/TripService";
import OfferItem from "../TopOffers/offerItem";
import {Link} from "react-router-dom";

class DestinationDetails extends Component{
    constructor(props) {
        super(props);
        this.state={
            destinationDetails:{},
            destinationLocation :{},
            weatherData:[],
            detailsDbpedia:{},
            attractions:[],
            museums:[],
            restaurants:[],
            bars:[],
            nightClubs:[],
            thingsToSee:'tourist',
            showAttractionMap:false,
            offersInDestination:[],
        }
    }

    render() {

        return (
            <div className={"lightBackground"}>
                <div style={{position: 'relative'}} id={"heroImageSearch"}>
                    {this.state.destinationDetails === null ? <></> :
                        <div className="card text-white border-0">
                            <img src={this.state.destinationDetails.destinationImage}
                                 className="d-block w-100 card-img darkenedImages" alt="image from the destination" />

                            <div className="card-img-overlay text-start" style={{top: '50%', left:'15%', }}>
                                <p className={"fw-bold"} style={{fontSize:'60px'}}>
                                    {this.state.destinationLocation.city}
                                </p>
                                <Link className={"btn btn-lg text-white me-2"}
                                      to={`/trips`}
                                      onClick={()=>this.props.setSearchTrip(this.state.destinationLocation.city,'any','any')}
                                      style={{backgroundColor:'#BB0422'}} >
                                    Book now
                                </Link>
                            </div>
                        </div>}
                </div>

                <div className={"container p-5"}>
                    <div className={"row"}>
                        <h2 className={"redText pb-3"}>Introducing {this.state.destinationLocation.city}</h2>
                        {this.state.detailsDbpedia === undefined ?  <Skeleton count={5} /> :
                            <div>
                                <span >
                                    {this.state.detailsDbpedia.destinationAbstract}
                                </span>
                                <div className={"row pt-5"}>
                                    <h3 className={"redText pb-3"}>Quick information</h3>
                                    <div className={"col-4 text-center"}>
                                        <h5 className={"fw-bold"}>Country code:</h5>
                                        <h5>{this.state.detailsDbpedia.countryCode}</h5>
                                    </div>
                                    <div className={"col-4 text-center"}>
                                        <h5 className={"fw-bold"}>Currency: </h5>
                                        <h5>{this.state.detailsDbpedia.currency}</h5>
                                    </div>
                                    <div className={"col-4 text-center"}>
                                        <h5 className={"fw-bold"}>Homepage:</h5>
                                        <a href={this.state.detailsDbpedia.homepage}>
                                            <h5>{this.state.detailsDbpedia.homepage}</h5>
                                        </a>
                                    </div>
                                </div>
                            </div>}
                    </div>


                    <div className={"row pt-3"}>
                        <h2 className={"redText pb-3"}>Weather forecast for the next 7 days</h2>
                        {this.state.weatherData.length === 0 ? <Loading /> :
                            <WeatherForecast  weatherData={this.state.weatherData}  />}
                    </div>
                </div>
                <div className={"darkBackground"}>
                    <div className={"container pt-5 pb-5"}>
                        <h2 className={"fw-bold text-white text-center pb-3"}>Things to see</h2>
                        <div className={" text-center"}>
                            <button className={"btn btn-outline-light me-3 selectedAttractionButton"} id={"tourist"}
                                    onClick={()=>this.displayAttractions("tourist")} >
                                Tourist attractions
                            </button>

                            <button className={"btn btn-outline-light me-3"} id={"restaurants"}
                                    onClick={()=>this.displayAttractions("restaurants")} >
                                Restaurants
                            </button>

                            <button className={"btn btn-outline-light me-3"} id={"museums"}
                                    onClick={()=>this.displayAttractions("museums")} >
                                Museums
                            </button>

                            <button className={"btn btn-outline-light me-3"} id={"bars"}
                                    onClick={()=>this.displayAttractions("bars")} >
                                Bars
                            </button>

                            <button className={"btn btn-outline-light me-3"} id={"clubs"}
                                    onClick={()=>this.displayAttractions("clubs")} >
                                Night clubs
                            </button>

                            <button className={"btn "} onClick={()=>this.setAttractionsMap(true)}
                                style={{backgroundColor:'#8AA6CA'}}>
                                View on map
                            </button>
                        </div>

                        <div className={"pt-3"}>
                            {this.state.thingsToSee === 'tourist' && this.state.attractions.length !== 0 &&
                            <div className={"row"}>
                                {this.state.attractions.map((term)=>{
                                    return(
                                        <TouristAttractionItem item={term} />
                                    )
                                })}
                                <DestinationAttractionsMap  show={this.state.showAttractionMap}
                                                            onHide={() => this.setAttractionsMap(false)}
                                                            items={this.state.attractions}
                                                            location={this.state.destinationLocation} />
                            </div>
                            }

                            {this.state.thingsToSee === 'museums' && this.state.museums.length !== 0 &&
                            <div className={"row"}>
                                {this.state.museums.map((term)=>{
                                    return(
                                        <TouristAttractionItem item={term} />
                                    )
                                })}
                                <DestinationAttractionsMap  show={this.state.showAttractionMap}
                                                            onHide={() => this.setAttractionsMap(false)}
                                                            items={this.state.museums}
                                                            location={this.state.destinationLocation} />
                            </div>
                            }

                            {this.state.thingsToSee === 'restaurants' && this.state.restaurants.length !== 0 &&
                            <div className={"row"}>
                                {this.state.restaurants.map((term)=>{
                                    return(
                                        <TouristAttractionItem item={term} />
                                    )
                                })}
                                <DestinationAttractionsMap  show={this.state.showAttractionMap}
                                                            onHide={() => this.setAttractionsMap(false)}
                                                            items={this.state.restaurants}
                                                            location={this.state.destinationLocation} />
                            </div>
                            }

                            {this.state.thingsToSee === 'bars' && this.state.bars.length !== 0 &&
                            <div className={"row"}>
                                {this.state.bars.map((term)=>{
                                    return(
                                        <TouristAttractionItem item={term} />
                                    )
                                })}
                                <DestinationAttractionsMap  show={this.state.showAttractionMap}
                                                            onHide={() => this.setAttractionsMap(false)}
                                                            items={this.state.bars}
                                                            location={this.state.destinationLocation} />
                            </div>
                            }

                            {this.state.thingsToSee === 'clubs' && this.state.nightClubs.length !== 0 &&
                            <div className={"row"}>
                                {this.state.nightClubs.map((term)=>{
                                    return(
                                        <TouristAttractionItem item={term} />
                                    )
                                })}
                                <DestinationAttractionsMap  show={this.state.showAttractionMap}
                                                            onHide={() => this.setAttractionsMap(false)}
                                                            items={this.state.nightClubs}
                                                            location={this.state.destinationLocation} />
                            </div>
                            }
                        </div>
                    </div>
                </div>

                <div className={"container text-center pt-5 pb-5"}>
                    <span className={"title"}>Trips in this destination</span>
                    {this.state.offersInDestination === null ? <></> :
                        <div className={"row pt-5"}>
                            {this.state.offersInDestination.map((term)=>{
                                return(
                                    <div className={"col-4"}>
                                        <OfferItem item={term} setSelectedTripId={this.props.setSelectedTripId}  />
                                    </div>
                                )
                            })}
                        </div>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        const destinationId = localStorage.getItem("selectedDestinationId")
        this.getDestinationDetails(destinationId);
        this.getWeatherDataForDestinations(destinationId);

    }

    displayAttractions=(id)=>{
        $('#tourist').removeClass("selectedAttractionButton")
        $('#restaurants').removeClass("selectedAttractionButton")
        $('#museums').removeClass("selectedAttractionButton")
        $('#bars').removeClass("selectedAttractionButton")
        $('#clubs').removeClass("selectedAttractionButton")

        $('#'+id).addClass("selectedAttractionButton")
        this.setState({
            thingsToSee:id
        })
    }

    setAttractionsMap=(value)=>{
        this.setState({
            showAttractionMap:value
        })
    }

    getDestinationDetails=(destinationId)=>{
        DestinationService.getDestinationDetails(destinationId)
            .then((data)=>{
                this.setState({
                    destinationDetails:data.data,
                    destinationLocation:data.data.destinationLocation
                })
                this.getDestinationDetailsFromDbpedia(data.data.destinationLocation.city,data.data.destinationLocation.country);
                this.getAttractionsForDestination(data.data.destinationLocation.city);
                this.getMuseumsForDestination(data.data.destinationLocation.city);
                this.getRestaurantsForDestination(data.data.destinationLocation.city);
                this.getBarsForDestination(data.data.destinationLocation.city);
                this.getNightClubsForDestination(data.data.destinationLocation.city);
                this.getTopThreeOffersForDestination(data.data.destinationLocation.city)
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

    getDestinationDetailsFromDbpedia=(city,country)=>{
        DestinationService.getDestinationDetailsFromDbpedia(city,country)
            .then((data)=>{
                this.setState({
                    detailsDbpedia:data.data
                })
            })
    }

    getAttractionsForDestination=(destination)=>{
        DestinationService.getAttractionsForDestination(destination)
            .then((data)=>{
                this.setState({
                    attractions: data.data
                })
            })
    }

    getMuseumsForDestination=(destination)=>{
        DestinationService.getMuseumsForDestination(destination)
            .then((data)=>{
                this.setState({
                    museums: data.data
                })
            })
    }

    getRestaurantsForDestination=(destination)=>{
        DestinationService.getRestaurantsForDestination(destination)
            .then((data)=>{
                this.setState({
                    restaurants: data.data
                })
            })
    }

    getBarsForDestination=(destination)=>{
        DestinationService.getBarsForDestination(destination)
            .then((data)=>{
                this.setState({
                    bars: data.data
                })
            })
    }

    getNightClubsForDestination=(destination)=>{
        DestinationService.getNightClubsForDestination(destination)
            .then((data)=>{
                this.setState({
                    nightClubs: data.data
                })
            })
    }

    getTopThreeOffersForDestination=(destination)=>{
        TripService.getTopThreeOffersForDestination(destination)
            .then((data)=>{
                this.setState({
                    offersInDestination:data.data
                })
            })
    }
}

export default DestinationDetails;