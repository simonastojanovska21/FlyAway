import axios from "../custom-axios/axiosInstance"

const ImageService={

    getImagesForHotel:(hotelId)=>{
        return axios.get(`/api/images/forHotel/${hotelId}`)
    },

    addImageForHotel:(hotelId, imageUrl, imageTag)=>{
        return axios.post(`/api/images/addForHotel/${hotelId}`,{
            "imageUrl":imageUrl,
            "imageTag":imageTag
        })
    },

    deleteImageForHotel:(imageId)=>{
        return axios.delete(`/api/images/deleteForHotel/${imageId}`)
    },

    getImagesForRoom:(roomId)=>{
        return axios.get(`/api/images/forRoom/${roomId}`)
    },

    addImageForRoom:(roomId, imageUrl)=>{
        return axios.post(`/api/images/addForRoom/${roomId}`,{
            "imageUrl":imageUrl,
            "imageTag":""
        })
    },

    deleteImageForRoom:(imageId)=>{
        return axios.delete(`/api/images/deleteForRoom/${imageId}`)
    }
}

export default ImageService;