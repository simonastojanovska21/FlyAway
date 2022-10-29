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

    getAllTripsForLocation:(location)=>{
        return axios.get(`/api/trips/tripsForDestination/${location}`)
    },

    getAllTripsForDate:(startDate, endDate)=>{
        return axios.get(`/api/trips/tripsForTime/${startDate}/${endDate}`)
    },

    getAllTripsForLocationAndDate:(location, startDate, endDate)=>{
        return axios.get(`/api/trips/tripsForDestinationAndTime/${location}/${startDate}/${endDate}`)
    },

    getTopThreeOffers:()=>{
        return axios.get('/api/trips/getTopThreeOffers')
    },

    getTopThreeOffersForDestination:(destination)=>{
        return axios.get(`/api/trips/getTopThreeOffersForDestination/${destination}`)
    }

}

export default TripService;