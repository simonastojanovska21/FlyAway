import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Home/home";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import AuthenticationService from "../../services/AuthenticationService";
import Profile from "../Profile/profile";

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        loggedInUser:{},
        userInfo:{},
      }
  }

  render() {
    return(
        <Router>
            <Header username={this.state.loggedInUser.username} onLogoutUser={this.logoutUser}
                    onLoginUser={this.loginUser} onRegisterUser={this.registerUser}/>
            <main>
                <div>
                    <Routes>
                        <Route path={"/"} element={ <Home/>  }/>
                        <Route path={"/profile"} element={
                            <Profile   />  }  />
                    </Routes>
                </div>
            </main>
            <Footer/>
        </Router>
    )
  }

  componentDidMount() {
      const currentUser = AuthenticationService.getCurrentUser();
      if (currentUser)
      {
          this.setState({ loggedInUser: currentUser })
          this.getInfoAboutUser(currentUser.username);
      }
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
        //window.location.href="http://localhost:3000/"
    }
    getInfoAboutUser=(username)=>{
        AuthenticationService.getInfoAboutUser(username)
            .then((data)=>{
                this.setState({
                    userInfo:data.data
                })
            })
    }
}

export default App;