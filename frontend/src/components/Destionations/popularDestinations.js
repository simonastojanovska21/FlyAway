import React from "react";

const PopularDestinations=(props)=>{
    //console.log(props.popularDestinations)
    return(
        <div className={"p-5"}>
            {props.popularDestinations.length === 0 ? <></> :
                <div className={"row"}>
                    {props.popularDestinations.map((term)=>{
                        return(
                            <div className={"col-4 pe-5"} >
                                <div className={"row "} style={{height:'120px'}}>
                                    <div className={"col-5"} style={{margin:0, padding:0}}>
                                        <img src={term.destinationThumbnail}
                                             className="img-fluid rounded-start h-100" alt="..." />
                                    </div>

                                    <div className={"col-7 blueBackground rounded-end pt-3 ps-3 pb-3 text-start"}>

                                        <h4 className={"fw-bold text-start"}>{term.destinationLocation.city}</h4>
                                        <span style={{fontSize:'12px'}} >
                                Explore restaurants, museums, tourist attractions...
                            </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            {/*<div className={"row"}>*/}
            {/*    <div className={"col-4 pe-5"}>*/}
            {/*        <div className={"row "}>*/}
            {/*            <div className={"col-4"} style={{margin:0, padding:0}}>*/}
            {/*                <img src="https://www.kaplaninternational.com/files/styles/hero_banner_k_mb/public/school/gallery/kaplan-english-school-in-London-4.jpg?itok=1UoqLcJ0"*/}
            {/*                     className="img-fluid rounded-start" alt="..." />*/}
            {/*            </div>*/}

            {/*            <div className={"col-8 blueBackground rounded-end pt-3 ps-3 pb-3 text-start"}>*/}
            {/*                <h4 className={"fw-bold text-start"}>London</h4>*/}
            {/*                <span style={{fontSize:'13px'}} >*/}
            {/*                    Explore restaurants, museums, theaters...*/}
            {/*                </span>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*    <div className={"col-4 pe-5"}>*/}
            {/*        <div className={"row "}>*/}
            {/*            <div className={"col-4"} style={{margin:0, padding:0}}>*/}
            {/*                <img src="https://www.kaplaninternational.com/files/styles/hero_banner_k_mb/public/school/gallery/kaplan-english-school-in-London-4.jpg?itok=1UoqLcJ0"*/}
            {/*                     className="img-fluid rounded-start" alt="..." />*/}
            {/*            </div>*/}

            {/*            <div className={"col-8 blueBackground rounded-end pt-3 ps-3 pb-3 text-start"}>*/}
            {/*                <h4 className={"fw-bold text-start"}>London</h4>*/}
            {/*                <span style={{fontSize:'13px'}} >*/}
            {/*                    Explore restaurants, museums, theaters...*/}
            {/*                </span>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*    <div className={"col-4 pe-5"}>*/}
            {/*        <div className={"row "}>*/}
            {/*            <div className={"col-4"} style={{margin:0, padding:0}}>*/}
            {/*                <img src="https://www.kaplaninternational.com/files/styles/hero_banner_k_mb/public/school/gallery/kaplan-english-school-in-London-4.jpg?itok=1UoqLcJ0"*/}
            {/*                     className="img-fluid rounded-start" alt="..." />*/}
            {/*            </div>*/}

            {/*            <div className={"col-8 blueBackground rounded-end pt-3 ps-3 pb-3 text-start"}>*/}
            {/*                <h4 className={"fw-bold text-start"}>London</h4>*/}
            {/*                <span style={{fontSize:'13px'}} >*/}
            {/*                    Explore restaurants, museums, theaters...*/}
            {/*                </span>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default PopularDestinations;