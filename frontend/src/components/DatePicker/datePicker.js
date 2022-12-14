import React, {Component, useState} from "react";
import 'react-dates/initialize';
import { DateRangePicker, isInclusivelyBeforeDay, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';
import { START_DATE, END_DATE } from 'react-dates/constants';

class DatePicker extends Component{

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
        if(focusedInput === START_DATE) {
            this.setState({ endDate: null });
        }
    }


    render() {
        const { focusedInput, startDate, endDate } = this.state;


        return (

                <DateRangePicker
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    startDateId="check_in" // PropTypes.string.isRequired,
                    startDatePlaceholderText={"Check In"}
                    endDate={endDate}
                    endDateId="check_out" // PropTypes.string.isRequired,
                    endDatePlaceholderText={"Check Out"}
                    displayFormat={() => "DD/MM/YYYY"}
                />
        );
    }
}

export default DatePicker;