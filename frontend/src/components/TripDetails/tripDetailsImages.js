import React from "react";
import AllHotelImages from "../Trip/allHotelImages";

const TripDetailsImages=(props)=>{

    const[showModal,setModalShow]=React.useState(false);

    return(
        <div>
            {props.imagesForHotel === undefined ? <></>  :

                <div className={"row pt-5"} >
                    <div className={"col-7"} style={{height:'400px'}}>
                        <img src={props.imagesForHotel[0]} className="d-block w-100 h-100 rounded-2" alt={"hotel images"}/>
                    </div>

                    <div className={"col-5"} >
                        <div className={"row g-4"} style={{height:'420px'}}>
                            <div className={"col-6"}>
                                <img src={props.imagesForHotel[1]} className="d-block w-100 h-100 rounded-2" alt={"hotel images"}/>
                            </div>

                            <div className={"col-6"}>
                                <img src={props.imagesForHotel[2]} className="d-block w-100 h-100 rounded-2" alt={"hotel images"}/>
                            </div>

                            <div className={"col-6"}>
                                <img src={props.imagesForHotel[3]} className="d-block w-100 h-100 rounded-2" alt={"hotel images"}/>
                            </div>

                            <div className={"col-6"}>
                                <img src={props.imagesForHotel[4]} className="d-block w-100 h-100 rounded-2" alt={"hotel images"}/>
                                <div className={"text-end showAllImagesForHotel"}>
                                    <button className={"btn"} style={{backgroundColor:'#f3f7f0'}}
                                            onClick={() => setModalShow(true)}>
                                        See all photos
                                    </button>
                                    <AllHotelImages show={showModal}
                                                    onHide={() => setModalShow(false)}
                                                    images={props.imagesForHotel}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default TripDetailsImages;