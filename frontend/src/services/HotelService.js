import axios from "../custom-axios/axiosInstance"

const HotelService={
    getHotelData:()=>{
        return axios.get('/api/hotels/hotelData')
    },

    addNewHotel:(name, description, address, city, country, amenities, checkInHour, checkOutHour, latitude, longitude, imagesUrl)=>{
        return axios.post('/api/hotels/addHotel',{
            "name":name,
            "description": description,
            "address":address,
            "city":city,
            "country":country,
            "amenities": amenities,
            "checkInHour": checkInHour,
            "checkOutHour":checkOutHour,
            "latitude":latitude,
            "longitude":longitude,
            "imagesUrl":imagesUrl
        })
    }
}

export default HotelService;