import axios from "../custom-axios/axiosInstance";

const ReviewService={
    leaveReview:(stars,description,username)=>{
        return axios.post('/api/review/addReview',{
            "stars":stars,
            "descriptions":description,
            "username":username
        })
    },

    getThreeReviews:()=>{
        return axios.get('/api/review/reviewList')
    },

    leaveHotelReview:(stars,description,username,hotelId)=>{
        return axios.post('/api/review/addHotelReview',{
            "stars":stars,
            "description":description,
            "username":username,
            "hotelId":hotelId
        })
    }
}

export default ReviewService;