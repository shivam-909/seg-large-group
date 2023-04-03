import axios from "axios";

export default function RefreshToken() {
    const formData = new FormData();
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
        formData.append("refresh_token", refreshToken);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/refresh`, formData)
            .then(response => {
                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);
            })
            .catch(err => console.log(err));
    }
}