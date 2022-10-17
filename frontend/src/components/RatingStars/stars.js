import React from "react";

const Stars=(props)=>{

    const handleChange = event => {}

    return(
        <div className="form-group">
            <div className="stars_rating">
                <input type="checkbox" id="5-star" name="stars" value="5" checked={props.numberStars === 5}
                       disabled/>
                <label htmlFor="5-star" title="Amazing" style={{fontSize: '170%'}}>5 ѕвезди</label>

                <input type="checkbox" id="4-star" name="stars" value="4" checked={props.numberStars === 4}
                       disabled/>
                <label htmlFor="4-star" title="Good" style={{fontSize: '170%'}}>4 ѕвезди</label>

                <input type="checkbox" id="3-star" name="stars" value="3" checked={props.numberStars === 3}
                       disabled/>
                <label htmlFor="3-star" title="Average" style={{fontSize: '170%'}}> 3 ѕвезди</label>

                <input type="checkbox" id="2-star" name="stars" value="2" checked={props.numberStars === 2}
                       disabled/>
                <label htmlFor="2-star" title="Not Good" style={{fontSize: '170%'}}>2 ѕвезди</label>

                <input type="checkbox" id="1-star" name="stars" value="1" checked={props.numberStars === 1}
                       disabled/>
                <label htmlFor="1-star" title="Bad" style={{fontSize: '170%'}}>1 ѕвезди</label>
            </div>
        </div>
    )
}

export default Stars;