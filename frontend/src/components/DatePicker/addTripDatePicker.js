import React, {Component, useState} from "react";
import 'react-dates/initialize';
import { SingleDatePicker } from "react-dates";

const AddTripDatePicker=(props)=>{
    const [date, setDate] = useState(null);
    const [focus, setFocus] = useState(false);


    return(
        <SingleDatePicker
            date={date} // momentPropTypes.momentObj or null
            id={props.elementId}
            placeholder={props.elementPlaceholder}
            onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
            focused={focus} // PropTypes.bool
            onFocusChange={({ focused }) => setFocus(focused)} // PropTypes.func.isRequired
            numberOfMonths={1}
            displayFormat="DD-MM-YYYY"
            showClearDate={true}
        />
    )
}

export default AddTripDatePicker;