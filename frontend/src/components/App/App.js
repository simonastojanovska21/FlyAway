import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Home/home";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import AuthenticationService from "../../services/AuthenticationService";
import Profile from "../Profile/profile";
import ReviewService from "../../services/ReviewService";
import AddHotel from "../Hotel/admin/addHotel";
import HotelService from "../../services/HotelService";
import HotelAdminList from "../Hotel/admin/hotelAdminList";
import RoomAdminList from "../Room/roomAdminList";
import AddRoom from "../Room/addRoom";
import ScrollToTop from "./ScrollToTop";
import EditHotel from "../Hotel/admin/editHotel";
import EditHotelImages from "../Hotel/admin/editHotelImages";
import EditRoom from "../Room/editRoom";
import EditRoomImages from "../Room/editRoomImages";
import HotelList from "../Hotel/hotelList";
import AddTrip from "../Trip/addTrip";
import TripList from "../Trip/tripList";
import TripDetails from "../TripDetails/tripDetails";
import UpcomingBookingsForUser from "../Bookings/upcomingBookingsForUser";
import PayForBooking from "../Payment/payForBooking";
import SuccessfulPayment from "../Payment/successfulPayment";

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        loggedInUser:{},
        userInfo:{},
        reviews:[],
        selectedHotelId:'',
        selectedHotelName:'',
        selectedRoomId:'',
        selectedTripId:'',
        selectedBookingId:'',
      }
  }

  render() {
    return(
        <Router>
            <ScrollToTop />
            <Header username={this.state.loggedInUser.username} onLogoutUser={this.logoutUser}
                    onLoginUser={this.loginUser} onRegisterUser={this.registerUser}/>
            <main>
                <div>
                    <Routes>
                        <Route path={"/"} element={ <Home reviews={this.state.reviews} />  }/>
                        <Route path={"/profile"} element={
                            <Profile user={this.state.userInfo}  onLeaveReview={this.leaveReview} />  }  />

                        <Route path={"/admin/hotels/add"} element={
                            <AddHotel /> } />
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
                               element={ <TripList setSelectedTripId={this.setSelectedTripId}  /> } />

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

                        <Route path={"/bookings"}
                               element={ <UpcomingBookingsForUser setSelectedBookingId={this.setSelectedBookingId} /> } />
                        <Route path={"/payment/:bookingId"}
                               element={ <PayForBooking selectedBookingId={this.state.selectedBookingId} /> } />
                        <Route path={"/successfulPayment"} element={ <SuccessfulPayment  /> } />

                    </Routes>
                </div>
            </main>
            <Footer/>
        </Router>
    )
  }

  componentDidMount() {
      this.getThreeReviews()
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
  }

    setSelectedHotelId=(hotelId,hotelName)=>{
      localStorage.setItem("selectedHotelId",hotelId)
      localStorage.setItem("selectedHotelName",hotelName)
      this.setState({
          selectedHotelId:hotelId,
          selectedHotelName:hotelName
          //selectedHotelId :'c07018fd-42e0-44f6-b42d-5a20cdbb55f4'
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

    loginUser=(username,password)=>{
        AuthenticationService.loginUser(username,password)
            .then(()=>{
                this.setState({
                    loggedInUser:AuthenticationService.getCurrentUser()
                })
                localStorage.removeItem("loginError")
                const currentUser = AuthenticationService.getCurrentUser();
                localStorage.setItem("userRole",currentUser.role);
                //console.log(localStorage.getItem("userRole"))
                //this.getOrderItemsForUser(currentUser.username);
                //this.getActiveOrderForUser(currentUser.username);
            })

    }
    registerUser=(username, password,repeatedPassword,name,surname,phoneNumber,address)=>{
        AuthenticationService.registerUser(username, password,repeatedPassword,name,surname,phoneNumber,address)
            .then(()=>{

            })
        localStorage.removeItem("passwordDoNotMatch");
        localStorage.removeItem("userExists");
    }
    logoutUser=()=>{
        AuthenticationService.logout();
        localStorage.removeItem("userRole");
        //console.log('User is logged out');
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


}

export default App;