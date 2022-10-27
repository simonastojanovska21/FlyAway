import axios from "../custom-axios/axiosInstance"

const TripService={
    addNewTrip:(hotelId,roomTypePrice,startDate,endDate)=>{
        return axios.post('/api/trips/addNewTrip',{
            "hotelId": hotelId,
            "roomTypePrice": roomTypePrice,
            "startDate": startDate,
            "endDate": endDate
        })
    },

    getAllTrips:()=>{
        return axios.get('/api/trips/all')
    },

    getTripDetails:(tripId)=>{
        return axios.get(`/api/trips/details/${tripId}`)
    },

    getTopFiveOffers:()=>{
        return axios.get('/api/trips/getTopFiveOffers')
    }
}

export default TripService;