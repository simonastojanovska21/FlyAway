import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faEnvelope, faPhone, faPrint, faLocationDot, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";

const Footer=(props)=>{
    return(
        <footer className={"darkBackground"} >
            <div className={"container pt-5 pb-5 footerWorldMap"}>

                <div className={"row"}>
                    <div className={"col-4 greyText"}>
                        <h4>Contact</h4>
                        <hr className={"bg-white mb-2 mt-0 d-inline-block mx-auto w-25"}/>
                        <ul className={"list-unstyled"}>
                            <li className={"h6"}><FontAwesomeIcon icon={faHome} className={"me-2"}/> Fly Away</li>
                            <li className={"h6"}><FontAwesomeIcon icon={faEnvelope} className={"me-2"}/> email@example.com</li>
                            <li className={"h6"}><FontAwesomeIcon icon={faPhone} className={"me-2"}/> + 389 70 123 456</li>
                            <li className={"h6"}><FontAwesomeIcon icon={faPrint} className={"me-2"}/> + 389 02 123 456</li>
                            <li className={"h6"}>
                                <a className={"text-decoration-none text-white fw-bold"} href={"/"}>
                                    <FontAwesomeIcon icon={faCircleQuestion} className={"me-2"}/> About us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={"col-4 greyText"}>
                        <h4>Frequently visited pages</h4>
                        <hr className={"bg-white mb-2 mt-0 d-inline-block mx-auto w-25"}/>
                        <ul className={"list-unstyled"}>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                            <li><a className={"text-decoration-none text-white fw-bold"} href={"/"}></a></li>
                        </ul>
                    </div>

                    <div className={"col-4 greyText"}>
                        <h4>Location</h4>
                        <hr className={"bg-white mb-2 mt-0 d-inline-block mx-auto w-25"}/>
                        <h6>
                            <FontAwesomeIcon icon={faLocationDot} className={"me-2"}/>
                            ul.Ruger Boshkovikj 16, 1000 Skopje,
                        </h6>
                        <br/>
                        <h4>Working hours</h4>
                        <hr className={"bg-white mb-2 mt-0 d-inline-block mx-auto w-25"}/>
                        <div className={"d-flex justify-content-between pb-2 pt-3 pe-5"}>
                            <div className={"me-5"}><h6>Monday-Friday</h6></div>
                            <div><h6>08:00-24:00</h6></div>
                        </div>
                        <div className={"d-flex justify-content-between pe-5"}>
                            <div className={"me-5"}><h6>Saturday-Sunday</h6></div>
                            <div><h6>08:00-22:00</h6></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;