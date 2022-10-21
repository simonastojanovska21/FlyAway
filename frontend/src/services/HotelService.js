import axios from "../custom-axios/axiosInstance"

const HotelService={
    getHotelData:()=>{
        return axios.get('/api/hotels/hotelData')
    },

    addNewHotel:(name, description, address, city, country, amenities, checkInHour, checkOutHour, latitude, longitude,stars, imagesUrl)=>{
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
            "stars":stars,
            "imagesUrl":imagesUrl
        })
    },

    getAdminHotelList:()=>{
        return axios.get('/api/hotels/adminHotelList')
    },

    getHotelDetails:(hotelId)=>{
        return axios.get(`/api/hotels/details/${hotelId}`)
    },

    editHotel:(hotelId,name, description, amenities, checkInHour, checkOutHour,stars)=>{
        return axios.put(`/api/hotels/edit/${hotelId}`,{
            "name":name,
            "description":description,
            "amenities":amenities,
            "checkInHour":checkInHour,
            "checkOutHour":checkOutHour,
            "stars":stars
        })
    },

    deleteHotel:(hotelId)=>{
        return axios.delete(`/api/hotels/delete/${hotelId}`)
    },

    getHotelsNameAndId:()=>{
        return axios.get('/api/hotels/getHotelsNameAndId')
    }
}

export default HotelService;