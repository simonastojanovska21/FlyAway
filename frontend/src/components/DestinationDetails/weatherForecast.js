import React from "react";

const WeatherForecast=(props)=>{

    return(
        <div className={"row"}>
            {props.weatherData.map((term)=>{
                return(
                    <div className={"weatherForecastColumn p-2"}>
                        <div className={"bg-body shadow border rounded text-center pt-3 pb-3"}>
                            <span className={"fw-bold"}>{term.date}</span>
                            {/*https://openweathermap.org/img/wn/04d@2x.png*/}
                            <img src={`http://openweathermap.org/img/wn/${term.icon.replaceAll("\"","")}@2x.png`}
                                 alt={"weather icon"}/>
                            <br/>
                            <span>{term.weatherDescription.replaceAll("\"","")}</span><br/>
                            <span className={"fw-bold"}>Day: {term.dayTemperature} &#8451; </span><br/>
                            <span className={"fw-bold"}>Night: {term.nightTemperature} &#8451;</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default WeatherForecast;