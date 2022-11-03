import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Home/home";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import AuthenticationService from "../../services/AuthenticationService";
import Profile from "../Profile/profile";
import ReviewService from "../../services/ReviewService";
import AddHotel from "../Hotel/addHotel";
import HotelAdminList from "../Hotel/hotelAdminList";
import RoomAdminList from "../Room/roomAdminList";
import AddRoom from "../Room/addRoom";
import ScrollToTop from "./ScrollToTop";
import EditHotel from "../Hotel/editHotel";
import EditHotelImages from "../Hotel/editHotelImages";
import EditRoom from "../Room/editRoom";
import EditRoomImages from "../Room/editRoomImages";
import AddTrip from "../Trip/addTrip";
import TripList from "../Trip/tripList";
import TripDetails from "../TripDetails/tripDetails";
import UpcomingBookingsForUser from "../Bookings/upcomingBookingsForUser";
import PayForBooking from "../Payment/payForBooking";
import SuccessfulPayment from "../Payment/successfulPayment";
import PaymentError from "../Payment/paymentError";
import TripService from "../../services/TripService";
import AddDestination from "../Destionations/addDestination";
import DestinationList from "../Destionations/destinationList";
import DestinationDetails from "../DestinationDetails/destinationDetails";
import DestinationService from "../../services/DestinationService";
import BookingsForTrip from "../Bookings/bookingsForTrip";

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        loggedInUser:{},
        userInfo:{},
        reviews:[],
        topOffers:[],
        popularDestinations:[],
        selectedHotelId:'',
        selectedHotelName:'',
        selectedRoomId:'',
        selectedTripId:'',
        selectedBookingId:'',
        selectedDestinationId:''
      }
  }

  render() {
    return(
        <Router>
            <ScrollToTop />
            <Header username={this.state.loggedInUser.username} onLogoutUser={this.logoutUser}
                    setSearchTrip={this.setSearchTrip} onLoginUser={this.loginUser} />
            <main>
                <div>
                    <Routes>
                        <Route path={"/"}
                               element={ <Home setSearchTrip={this.setSearchTrip}
                                               reviews={this.state.reviews}
                                               topOffers={this.state.topOffers}
                                               popularDestinations={this.state.popularDestinations}
                                               setSelectedDestinationId={this.setSelectedDestinationId}
                                               setSelectedTripId={this.setSelectedTripId}    />  }/>
                        <Route path={"/profile"}
                               element={ <Profile user={this.state.userInfo}
                                                  setSearchTrip={this.setSearchTrip}
                                                  onLeaveReview={this.leaveReview} />  }  />

                        <Route path={"/admin/hotels/add"}
                               element={ <AddHotel /> } />
                        <Route path={"/admin/hotels/edit/:hotelId"}
                               element={ <EditHotel selectedHotelId={this.state.selectedHotelId} /> } />
                        <Route path={"/admin/hotels/imagesForHotel/:hotelId"}
                               element={<EditHotelImages selectedHotelId={this.state.selectedHotelId} /> } />
                        <Route path={"/admin/hotels"}
                               element={ <HotelAdminList setSelectedHotelId={this.setSelectedHotelId} /> } />

                        <Route path={"/trips/add"}
                               element={ <AddTrip  /> } />
                        <Route path={"/trips/details/:tripId"}
                               element={<TripDetails selectedHotelId={this.state.selectedHotelId}
                                                     selectedTripId={this.state.selectedTripId} /> } />
                        <Route path={"/trips"}
                               element={ <TripList setSearchTrip={this.setSearchTrip}
                                                   setSelectedTripId={this.setSelectedTripId}  /> } />

                        <Route path={"/admin/rooms/add"}
                               element={<AddRoom selectedHotelId={this.state.selectedHotelId}/> } />
                        <Route path={"/admin/rooms/edit/:roomId"}
                               element={<EditRoom selectedRoomId={this.state.selectedRoomId}/>} />
                        <Route path={"/admin/rooms/imagesForRoom/:roomId"}
                               element={<EditRoomImages selectedRoomId={this.state.selectedRoomId} />} />
                        <Route path={"/admin/rooms/roomsInHotel/:hotelId"}
                               element={ <RoomAdminList selectedHotelId={this.state.selectedHotelId}
                                                        selectedHotelName={this.state.selectedHotelName}
                                                        setSelectedRoomId={this.setSelectedRoomId}/> } />

                        <Route path={"/bookings/forTrip/:tripId"}
                               element={<BookingsForTrip setSelectedBookingId={this.setSelectedBookingId}
                                                           /> } />
                        <Route path={"/bookings"}
                               element={ <UpcomingBookingsForUser setSelectedBookingId={this.setSelectedBookingId} /> } />
                        <Route path={"/payment/:bookingId"}
                               element={ <PayForBooking selectedBookingId={this.state.selectedBookingId} /> } />
                        <Route path={"/successfulPayment"}
                               element={ <SuccessfulPayment  /> } />
                        <Route path={"/paymentError"}
                               element={ <PaymentError /> } />

                        <Route path={"/destinations/add"}
                               element={ <AddDestination  />  }  />
                        <Route path={"/destinations/:destinationId"}
                               element={ <DestinationDetails setSearchTrip={this.setSearchTrip}
                                                             selectedDestinationId={this.state.selectedDestinationId}
                                                             setSelectedTripId={this.setSelectedTripId} /> } />
                        <Route path={"/destinations"}
                               element={ <DestinationList setSearchTrip={this.setSearchTrip}
                                                          setSelectedDestinationId={this.setSelectedDestinationId} /> } />

                    </Routes>
                </div>
            </main>
            <Footer setSearchTrip={this.setSearchTrip}/>
        </Router>
    )
  }

  componentDidMount() {
      this.getThreeReviews()
      this.getTopThreeOffers()
      this.getPopularDestinations()
      const currentUser = AuthenticationService.getCurrentUser();
      if (currentUser) {
          this.setState({ loggedInUser: currentUser })
          this.getInfoAboutUser(currentUser.username);
          localStorage.setItem("username",currentUser.username)
      }
      if(localStorage.getItem("selectedHotelId") !== null) {
          this.setState({selectedHotelId: localStorage.getItem("selectedHotelId")})
          this.setState({selectedHotelName: localStorage.getItem("selectedHotelName")})
      }
      if(localStorage.getItem("selectedRoomId") !== null)
          this.setState({selectedRoomId: localStorage.getItem("selectedRoomId")})
      if(localStorage.getItem("selectedTripId") !==null)
          this.setState({selectedTripId: localStorage.getItem("selectedTripId")})
      if(localStorage.getItem("selectedDestinationId") !== null)
          this.setState({selectedDestinationId:localStorage.getItem("selectedDestinationId")})
  }

    setSelectedHotelId=(hotelId,hotelName)=>{
      localStorage.setItem("selectedHotelId",hotelId)
      localStorage.setItem("selectedHotelName",hotelName)
      this.setState({
          selectedHotelId:hotelId,
          selectedHotelName:hotelName
      })
    }

    setSelectedRoomId=(roomId)=>{
      localStorage.setItem("selectedRoomId",roomId)
        this.setState({
            selectedRoomId:roomId
        })
    }
    setSelectedTripId=(selectedTripId,hotelId)=>{
        localStorage.setItem("selectedTripId",selectedTripId)
        localStorage.setItem("selectedHotelId",hotelId)
        this.setState({
            selectedTripId:selectedTripId,
            selectedHotelId:hotelId
        })
    }

    setSelectedBookingId=(selectedBookingId)=>{
      localStorage.setItem("selectedBookingId",selectedBookingId)
        this.setState({
            selectedBookingId:selectedBookingId
        })
    }

    setSelectedDestinationId=(selectedDestinationId)=>{
      localStorage.setItem("selectedDestinationId",selectedDestinationId)
        this.setState({
            selectedDestinationId: selectedDestinationId
        })
    }

    setSearchTrip=(location, startDate, endDate)=>{
        localStorage.removeItem("location")
        localStorage.removeItem("startDate")
        localStorage.removeItem("endDate")
        console.log(location+", "+startDate+", "+endDate)
        if(location !== 'any')
            localStorage.setItem("location",location)
        if(startDate !== 'any')
            localStorage.setItem("startDate",startDate)
        if(endDate !== 'any')
            localStorage.setItem("endDate",endDate)
    }

    loginUser=(username,password)=>{
        AuthenticationService.loginUser(username,password)
            .then(()=>{
                this.setState({
                    loggedInUser:AuthenticationService.getCurrentUser()
                })
                localStorage.removeItem("loginError")
                const currentUser = AuthenticationService.getCurrentUser();
                localStorage.setItem("userRole",currentUser.role);
            })

    }
    logoutUser=()=>{
        AuthenticationService.logout();
        localStorage.removeItem("userRole");
        window.location.href="http://localhost:3000/"
    }
    getInfoAboutUser=(username)=>{
        AuthenticationService.getInfoAboutUser(username)
            .then((data)=>{
                this.setState({
                    userInfo:data.data
                })
            })
    }

    leaveReview=(stars,description,username)=>{
        ReviewService.leaveReview(stars,description,username)
            .then(()=>{
                this.getInfoAboutUser(username);
            })
    }
    getThreeReviews=()=>{
        ReviewService.getThreeReviews()
            .then((data)=>{
                this.setState({
                    reviews : data.data
                })
            })
    }

    getTopThreeOffers=()=>{
      TripService.getTopThreeOffers()
          .then((data)=>{
              this.setState({
                  topOffers : data.data
              })
          })
    }

    getPopularDestinations=()=>{
      DestinationService.getTopThreeDestinations()
          .then((data)=>{
              this.setState({
                  popularDestinations:data.data
              })
          })
    }
}

export default App;