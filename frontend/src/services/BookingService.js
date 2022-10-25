import axios from "../custom-axios/axiosInstance";

const BookingService={
    getUpcomingBookingsForUser:(username)=>{
        return axios.get(`/api/bookings/upcomingBookings/${username}`)
    },

    getAllBookingsForUser:(username)=>{
        return axios.get(`/api/bookings/allBookings/${username}`)
    },

    getBookingDetails:(bookingId)=>{
        return axios.get(`/api/bookings/details/${bookingId}`)
    },

    payForBookingForTrip:(bookingId)=>{
        return axios.get(`/api/bookings/payForTrip/${bookingId}`)
    },

    cancelBookingForTrip:(bookingId)=>{
        return axios.get(`/api/bookings/cancelBooking/${bookingId}`)
    },

    getAllBookingsForTrip:(tripId)=>{
        return axios.get(`/api/bookings/forTrip/${tripId}`)
    },

    addNewBooking:(username,tripId, roomId, totalPrice)=>{
        return axios.post(`/api/bookings/addNewBooking`,{
            "username": username,
            "tripId": tripId,
            "roomId": roomId,
            "totalPrice": totalPrice,
        })
    }
}

export default BookingService;