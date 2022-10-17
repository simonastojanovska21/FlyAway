import React from "react";

const PersonalDetails=(props)=>{
    return(
        <div className={"ps-5 pt-3"}>
            <div className={"row pb-3"}>
                <div className={"col-3 text-start fw-bold"}>
                    First name:
                </div>
                <div className={"col-9 text-start"}>
                    {props.user.name}
                </div>
            </div>

            <div className={"row pb-3"}>
                <div className={"col-3 text-start fw-bold"}>
                    Last name:
                </div>
                <div className={"col-9 text-start"}>
                    {props.user.surname}
                </div>
            </div>

            <div className={"row pb-3"}>
                <div className={"col-3 text-start fw-bold"}>
                    Email:
                </div>
                <div className={"col-9 text-start"}>
                    {props.user.username}
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails;