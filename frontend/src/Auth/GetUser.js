import axios from "axios";

export const GetData = async () => {
    const token = localStorage.getItem("access");
    const userID = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/echo`, {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/${userID}`).then(response => {return response.data});
}