
import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Home/home";
import Header from "../Header/header";
import Footer from "../Footer/footer";

class App extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Router>
            <Header/>
          <main>
            <div>
              <Routes>
                <Route path={"/"} element={
                  <Home/>  }/>
              </Routes>
            </div>
          </main>
            <Footer/>
        </Router>
    )
  }
}

export default App;