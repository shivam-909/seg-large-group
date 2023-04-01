import axios from "axios";

export const GetData = async () => {
    const token = localStorage.getItem("access");
    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user`, {}, {headers: {Authorization: `Bearer ${token}`}})
        .then(response => {return response.data})
        .catch(error => console.log(error));
}