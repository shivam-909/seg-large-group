import axios from "axios";
import RefreshToken from "./RefreshToken";

export const GetData = async () => {
    RefreshToken();
    const token = localStorage.getItem("access");
    if (token) {
        return await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user`, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error));
    }
}