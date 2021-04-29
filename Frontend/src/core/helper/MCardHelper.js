import { API } from "../../backend";

export const getProductPhoto = () => {
    return fetch(`${API}/product/image/${product._id}`, {
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

