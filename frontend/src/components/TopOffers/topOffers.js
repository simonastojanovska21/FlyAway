import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import Stars from "../RatingStars/stars";

const TopOffers=(props)=>{
    return(
        <div className={"p-5"}>
            <OwlCarousel className='owl-theme' loop margin={20} >
                <div className={'item'}>
                    <div className="card mb-3 shadow p-3 mb-5 rounded">
                        <img src="https://ireward.superghs.com/resource/microtelmonticello/homepage_gallery/microtelmonticello_2020Oct15_15_58_hm-deluxe-room.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className={"card-text text-start"}>
                                <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                                <span className={"ps-4 text-muted"}>Skopje, North Macedonia</span>
                            </p>

                            <h5 className="card-title text-start fw-bold pt-2">Skopje Marriott Hotel</h5>

                            <div className={"d-flex justify-content-between pb-2 pt-3"}>
                                <div>
                                    <Stars numberStars={2} />
                                </div>
                                <div>
                                    <span className={"card-text h4"}>$ 5000 </span>
                                    <span className={"card-text text-muted"}>
                                             per night
                                        </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={'item'}>
                    <div className="card mb-3 shadow p-3 mb-5 rounded">
                        <img src="https://ireward.superghs.com/resource/microtelmonticello/homepage_gallery/microtelmonticello_2020Oct15_15_58_hm-deluxe-room.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className={"card-text text-start"}>
                                <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                                <span className={"ps-4 text-muted"}>Skopje, North Macedonia</span>
                            </p>

                            <h5 className="card-title text-start fw-bold pt-2">Skopje Marriott Hotel</h5>

                            <div className={"d-flex justify-content-between pb-2 pt-3"}>
                                <div>
                                    <Stars numberStars={2} />
                                </div>
                                <div>
                                    <span className={"card-text h4"}>$ 5000 </span>
                                    <span className={"card-text text-muted"}>
                                             per night
                                        </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={'item'}>
                    <div className="card mb-3 shadow p-3 mb-5 rounded">
                        <img src="https://ireward.superghs.com/resource/microtelmonticello/homepage_gallery/microtelmonticello_2020Oct15_15_58_hm-deluxe-room.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className={"card-text text-start"}>
                                <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                                <span className={"ps-4 text-muted"}>Skopje, North Macedonia</span>
                            </p>

                            <h5 className="card-title text-start fw-bold pt-2">Skopje Marriott Hotel</h5>

                            <div className={"d-flex justify-content-between pb-2 pt-3"}>
                                <div>
                                    <Stars numberStars={2} />
                                </div>
                                <div>
                                    <span className={"card-text h4"}>$ 5000 </span>
                                    <span className={"card-text text-muted"}>
                                             per night
                                        </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={'item'}>
                    <div className="card mb-3 shadow p-3 mb-5 rounded">
                        <img src="https://ireward.superghs.com/resource/microtelmonticello/homepage_gallery/microtelmonticello_2020Oct15_15_58_hm-deluxe-room.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className={"card-text text-start"}>
                                <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                                <span className={"ps-4 text-muted"}>Skopje, North Macedonia</span>
                            </p>

                            <h5 className="card-title text-start fw-bold pt-2">Skopje Marriott Hotel</h5>

                            <div className={"d-flex justify-content-between pb-2 pt-3"}>
                                <div>
                                    <Stars numberStars={2} />
                                </div>
                                <div>
                                    <span className={"card-text h4"}>$ 5000 </span>
                                    <span className={"card-text text-muted"}>
                                             per night
                                        </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={'item'}>
                    <div className="card mb-3 shadow p-3 mb-5 rounded">
                        <img src="https://ireward.superghs.com/resource/microtelmonticello/homepage_gallery/microtelmonticello_2020Oct15_15_58_hm-deluxe-room.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className={"card-text text-start"}>
                                <FontAwesomeIcon icon={faMapPin} size={"lg"}/>
                                <span className={"ps-4 text-muted"}>Skopje, North Macedonia</span>
                            </p>

                            <h5 className="card-title text-start fw-bold pt-2">Skopje Marriott Hotel</h5>

                            <div className={"d-flex justify-content-between pb-2 pt-3"}>
                                <div>
                                    <Stars numberStars={2} />
                                </div>
                                <div>
                                    <span className={"card-text h4"}>$ 5000 </span>
                                    <span className={"card-text text-muted"}>
                                             per night
                                        </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </OwlCarousel>
        </div>
    )
}

export default TopOffers;