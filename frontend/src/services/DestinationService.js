import axios from "../custom-axios/axiosInstance";

const DestinationService={
    addNewDestination:(city,country,destinationImage,destinationThumbnail)=>{
        return axios.post('/api/destinations/addNewDestination',{
            "city":city,
            "country":country,
            "destinationImage":destinationImage,
            "destinationThumbnail":destinationThumbnail
        })
    },

    getAllDestinations:()=>{
        return axios.get('/api/destinations/getAllDestinations')
    },

    getDestinationDetails:(destinationId)=>{
        return axios.get(`/api/destinations/${destinationId}`)
    },

    getWeatherDataForDestination:(destinationId)=>{
        return axios.get(`/api/destinations/getWeatherConditions/${destinationId}`)
    }
}

export default DestinationService;