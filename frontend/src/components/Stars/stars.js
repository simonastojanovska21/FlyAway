import React, {Component} from "react";
import $ from 'jquery';

class Stars extends Component{

    render() {
        return(
            <div className="form-group">
                <ul className="rate-area">
                    <input type="checkbox" id="5-star" name="stars" value="5" />
                    <label htmlFor="5-star" title="Amazing">5 ѕвезди</label>

                    <input type="checkbox" id="4-star" name="stars" value="4"/>
                    <label htmlFor="4-star" title="Good">4 ѕвезди</label>

                    <input type="checkbox" id="3-star" name="stars" value="3"/>
                    <label htmlFor="3-star" title="Average">3 ѕвезди</label>

                    <input type="checkbox" id="2-star" name="stars" value="2"/>
                    <label htmlFor="2-star" title="Not Good">2 ѕвезди</label>

                    <input type="checkbox" id="1-star" name="stars" value="1"/>
                    <label htmlFor="1-star" title="Bad">1 ѕвезди</label>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        let elementId = '#'+this.props.numberStars + '-star'
        $(elementId).prop( "checked", true)
    }
}


export default Stars;