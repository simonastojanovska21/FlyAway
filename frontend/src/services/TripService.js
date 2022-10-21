import axios from "../custom-axios/axiosInstance"

const TripService={
    addNewTrip:(hotelId,roomTypePrice,startDate,endDate)=>{
        return axios.post('/api/trips/addNewTrip',{
            "hotelId": hotelId,
            "roomTypePrice": roomTypePrice,
            "startDate": startDate,
            "endDate": endDate
        })
    }
}

export default TripService;