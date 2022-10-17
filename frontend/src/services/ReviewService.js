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
    }
}

export default ReviewService;