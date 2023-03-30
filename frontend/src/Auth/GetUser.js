import axios from "axios";

export const GetData = async () => {
    const token = localStorage.getItem("access");
    const userID = await axios.post('https://seg-job-board.herokuapp.com/api/echo', {}, {headers: {Authorization: `Bearer ${token}`}}).then(response => {return response.data})
    return await axios.get("https://seg-job-board.herokuapp.com/api/user/"+userID).then(response => {return response.data});
}