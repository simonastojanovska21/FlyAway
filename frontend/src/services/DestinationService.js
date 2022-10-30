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
        return axios.get(`/api/destinations/getDestinationDetails/${destinationId}`)
    },

    getWeatherDataForDestination:(destinationId)=>{
        return axios.get(`/api/destinations/getWeatherConditions/${destinationId}`)
    },

    getDestinationDetailsFromDbpedia:(city,country)=>{
        return axios.get(`/api/destinations/getDestinationDetailsFromDbpedia/${city}/${country}`)
    },

    getMuseumsForDestination:(destination)=>{
        return axios.get(`/api/destinations/getMuseumsForDestination/${destination}`)
    },

    getAttractionsForDestination:(destination)=>{
        return axios.get(`/api/destinations/getAttractionsForDestination/${destination}`)
    },

    getRestaurantsForDestination:(destination)=>{
        return axios.get(`/api/destinations/getRestaurantsForDestination/${destination}`)
    },

    getBarsForDestination:(destination)=>{
        return axios.get(`/api/destinations/getBarsForDestination/${destination}`)
    },

    getNightClubsForDestination:(destination)=>{
        return axios.get(`/api/destinations/getNightClubsForDestination/${destination}`)
    },

    getTopThreeDestinations:()=>{
        return axios.get(`/api/destinations/getTopThreeDestinations`)
    }
}

export default DestinationService;