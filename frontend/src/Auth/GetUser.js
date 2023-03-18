import axios from "axios";

export const GetData = async () => {
    const token = localStorage.getItem("access");
    const userID = await axios.post('http://localhost:8000/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
    return await axios.get("http://localhost:8000/api/user/"+userID).then(response => {return response.data});
}