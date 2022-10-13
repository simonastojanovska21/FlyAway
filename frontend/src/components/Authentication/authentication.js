import React, {Component, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import Register from "./register";
import Login from "./login";
import $ from 'jquery';

const Authentication=(props)=>{

    const [displayLogin, setDisplayLogin] = React.useState(true);

    const displayLoginComponent= (e) => {
        e.preventDefault();
        setDisplayLogin(true)
        $('#loginLink').addClass('underline')
        $('#registerLink').removeClass('underline')
    }
    const displayRegisterComponent= (e) => {
        e.preventDefault();
        setDisplayLogin(false)
        $('#registerLink').addClass('underline')
        $('#loginLink').removeClass('underline')
    }

    const hideModal=(e)=>{
        e.preventDefault()
        props.onHide()
        setDisplayLogin(true)
    }

    return(
        <Modal
            {...props}
            size="lg"
            centered>

            <Modal.Header className={"border-0 p-4 "} >
                <div className={"col-2"}>
                </div>
                <div className={"col-8 text-center"}>
                    <button className={"btn me-4"} id={"registerLink"} onClick={displayRegisterComponent}>
                        Register
                    </button>
                    <button className={"btn underline"} id={"loginLink"} onClick={displayLoginComponent}>
                        Login
                    </button>
                </div>
                <div className={"col-2 text-end pe-3"}>
                    <button className={"btn-close"} onClick={hideModal}>

                    </button>
                </div>
            </Modal.Header>
            <Modal.Body >
                {displayLogin ? <Login onLoginUser={props.onLoginUser}  hideWindow={props.onHide}/>
                    : <Register onRegisterUser={props.onRegisterUser} hideWindow={props.onHide} /> }

            </Modal.Body>

        </Modal>
    )
}




export default Authentication;