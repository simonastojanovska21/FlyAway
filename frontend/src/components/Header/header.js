import React from "react";
import logo from '../../images/logo.png'
import {Link} from "react-router-dom";
import Authentication from "../Authentication/authentication";

const Header=(props)=>{

    const [authenticationShow, setAuthenticationShow] = React.useState(false);


    const handleLogout=(e)=>{
        e.preventDefault()

        props.onLogoutUser();

    }

    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-light darkBackground">
                <div className={"container"}>
                    <a className="navbar-brand" href="/">
                        <img src={logo} className={"logos"} alt={"logo"}/>
                        <span className={"companyName ps-4"}>Fly away</span>
                    </a>

                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item me-3 greyButtonBackground rounded">
                                <a className={"btn fw-bold"} href={"/trips"}>Testing</a>
                            </li>
                            <li className="nav-item me-3 greyButtonBackground rounded">
                                <a className={"btn fw-bold"} href={"/"}>Trips</a>
                            </li>
                            <li className="nav-item me-3 greyButtonBackground rounded">
                                <a className={"btn fw-bold"} href={"/"}>Destinations</a>
                            </li>
                            <li className="nav-item me-3 greyButtonBackground rounded">
                                <a className={"btn fw-bold"} href={"/"}>Orders</a>
                            </li>
                            {props.username !== undefined &&
                            <li className="nav-item me-3 greyButtonBackground rounded">
                                <a className={"btn brownText fw-bold"} id={"profileButton"} href={"/profile"}>{props.username}'s profile</a>
                            </li>
                            }
                            {props.username !== undefined &&
                            <li className="nav-item greyButtonBackground rounded">
                                <button id={"logoutButton"} type={"button"} className={"btn fw-bold"}
                                        onClick={handleLogout}>Logout
                                </button>
                            </li>
                            }
                            {props.username === undefined &&
                            <li className="nav-item me-3 headerButton rounded">
                                <button className={"btn fw-bold"} onClick={() => setAuthenticationShow(true)}>
                                    Login
                                </button>
                            </li>
                            }
                        </ul>
                    </div>
                </div>

                <Authentication show={authenticationShow}
                                onHide={() => setAuthenticationShow(false)}
                                onLoginUser={props.onLoginUser}
                                onRegisterUser={props.onRegisterUser}/>

            </nav>
        </header>
    )
}

export default Header;