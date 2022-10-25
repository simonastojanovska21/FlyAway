import axios from "../custom-axios/axiosInstance"

const RoomService={
    getRoomData:()=>{
        return axios.get('/api/rooms/roomData')
    },

    addNewRoom:(numberOfAvailableRooms,pricePerNight,numberOfGuests,roomType,hotelId,imagesUrl)=>{
        return axios.post('/api/rooms/addNewRoom',{
            "numberOfAvailableRooms":numberOfAvailableRooms,
            "pricePerNight":pricePerNight,
            "numberOfGuests":numberOfGuests,
            "roomType":roomType,
            "hotelId":hotelId,
            "imagesUrl":imagesUrl
        })
    },

    getRoomsInHotel:(hotelId)=>{
        return axios.get(`/api/rooms/roomsInHotel/${hotelId}`)
    },

    getRoomDetails:(roomId)=>{
        return axios.get(`/api/rooms/details/${roomId}`)
    },

    editRoom:(roomId,pricePerNight,numberOfGuests,roomType)=>{
        return axios.put(`/api/rooms/edit/${roomId}`,{
            "pricePerNight":pricePerNight,
            "numberOfGuests":numberOfGuests,
            "roomType":roomType,
        })
    },

    deleteRoom:(roomId)=>{
        return axios.delete(`/api/rooms/delete/${roomId}`)
    },

    getRoomTypesAndPriceInHotel:(hotelId)=>{
        return axios.get(`api/rooms/roomTypesAndPrice/${hotelId}`)
    }
}

export default RoomService;