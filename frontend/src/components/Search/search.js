import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faPlus, faMinus, faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import $ from 'jquery';
import DatePicker from "../DatePicker/datePicker";

const Search=(props)=>{
    let peopleVariable = 2;
    let inputText = "2 guests"

    const handleMinusClick = (e) => {
        e.preventDefault();
        if (peopleVariable > 1)
            peopleVariable -= 1;
        inputText = peopleVariable + (peopleVariable === 1 ? " guest" : " guests")
        $('#quantity').val(inputText)
    };

    const handlePlusClick = (e) => {
        e.preventDefault();
        if (peopleVariable < 10)
            peopleVariable += 1
        inputText = peopleVariable + (peopleVariable === 1 ? " guest" : " guests")
        $('#quantity').val(inputText)
    };

    const handleSearch = (e)=>{
        const destination = $('#location').val();
        console.log(destination)
        const checkIn = $('#check_in').val().replaceAll('/','-')
        console.log(checkIn)
        const checkOut = $('#check_out').val().replaceAll('/','-')
        console.log(checkOut)
        let location = destination === "" ? 'any' : destination
        let startDate = checkIn === "" ? 'any' : checkIn
        let endDate = checkOut === "" ? 'any' : checkOut
        props.setSearchTrip(location,startDate,endDate);
        window.location.href="http://localhost:3000/trips"
    }

    return(
        <div className={"border border-5 shadow-lg p-3 mb-5 whiteBackground"} >
            <div className={"row  pt-2 pb-2"}>
                <div className={"col-4  border-2 border-end"} >
                    <div className="input-group">
                        <span className="input-group-text border-0 bg-body">
                            <FontAwesomeIcon icon={faSearch} size={"lg"}/>
                        </span>
                        <input type="text" id={"location"} className="form-control border-0"
                               placeholder="Where would you like to go?" />
                    </div>
                </div>

                <div className={"col-4 border-2 border-end"}>
                    <div className={"input-group"}>
                        <span className="input-group-text border-0 bg-body">
                            <FontAwesomeIcon icon={faCalendarDays} size={"lg"}/>
                        </span>
                        <div className={"form-control border-0 customDatePickerWidth"} style={{zIndex:'15'}} >
                            <DatePicker/>
                        </div>
                    </div>
                </div>

                <div className={"col-2 border-2 border-end"}>
                    <div className="input-group">
                        <button name="quantity" className={"btn btn-minus"} type="button" onClick={handleMinusClick}
                                style={{backgroundColor: '#8AA6CA', color: '#f3f7f0'}} >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input type="text" className={"form-control text-center"}
                               name="quantity" id="quantity" placeholder={inputText}/>
                        <button name="quantity" className={"btn btn-plus"} type="button" onClick={handlePlusClick}
                                style={{backgroundColor: '#8AA6CA', color: '#f3f7f0'}}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>

                <div className={"col-2 d-grid gap-2"}>
                    <Link className={" btn rounded-0 text-white fontSize"}
                            onClick={()=>handleSearch()}
                            to={'/trips'}
                            style={{backgroundColor :'#BB0422'}}>
                        Search
                    </Link>
                </div>
            </div>
        </div>
    )



}

export default Search;