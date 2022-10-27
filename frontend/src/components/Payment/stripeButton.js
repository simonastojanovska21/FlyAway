import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "../../custom-axios/axiosInstance";
import {Navigate} from "react-router-dom";

const StripeButton=(props)=>{
    const publishableKey = "pk_test_51J7SbnEZTDyznlQRAKwy6Vj2vMMWNsbns1OE7SkaVfKbOHU2Q1S5JIXvzz100kAvJHdxio1Or7G3Dyd4uJpjB3jD0070T275uD"
    const stripePrice = props.price * 100;

    const onToken=(token)=>{
        return axios.post('/api/payment',{
            "amount":stripePrice,
            "token":token,
            "bookingId":props.bookingId
        }).then((response)=>{
            console.log(response)
            console.log("success")
            window.location.href='http://localhost:3000/successfulPayment'
        }).catch((error)=>{
            console.log(error)
            console.log("error")
            window.location.href='http://localhost:3000/paymentError'
        })
    }

    return(
        <StripeCheckout
            amount={stripePrice}
            label="Pay Now"
            name="Fly away"
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is ${props.price}`}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            currency="EUR"
        />
    )
}

export default StripeButton;