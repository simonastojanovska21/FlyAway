import axios from "../custom-axios/axiosInstance";
import jwt from 'jwt-decode';

const AuthenticationService={
    loginUser:(username, password)=>{
        return axios.post("/login",{
            "username":username,
            "password":password
        })
            .then(response => {
                let token=response.data;
                let decoded=jwt(token);
                localStorage.setItem("user",decoded.sub);
                return response.data;
            })
    },
    registerUser:(username, password,repeatedPassword,name,surname)=>{
        return axios.post("/api/authentication/register",{
            "username":username,
            "password":password,
            "repeatedPassword":repeatedPassword,
            "name":name,
            "surname":surname,
        })
    },
    logout() {
        localStorage.removeItem("user");
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
    getInfoAboutUser(username){
        return axios.get(`/api/authentication/userInfo/${username}`)
    },
}

export default AuthenticationService;