import axios from 'axios';


export async function getAllProduct() {
    const api = 'http://localhost:3030/product'

    const fetchPro = await axios.get(api);
    return fetchPro.data;
}


//process cart 
export async function findCart(userID) {
    const { data } = await axios.get(`http://localhost:3030/cart/${userID}`);
    return data;
}


export async function addToCart(info) {
    const data = await axios.put('http://localhost:3030/cart/user', info)
    return data;
}

export async function checkoutService(userID) {
    const { data } = await axios.post('http://localhost:3030/order', userID)
    return data;

}

export async function removeProductFromCart(info) {
    const { data } = await axios.put('http://localhost:3030/cart/product', info)
    return data;
}

export async function getAllComment(id) {
    const { data } = await axios.get(`http://localhost:3030/comment/${id}`)
    return data;
}

export async function getUser(id) {
    const { data } = await axios.get(`http://localhost:3030/user/${id}`)
    return data;
}

export async function editUserInfo(id, info) {
    const { data } = await axios.put(`http://localhost:3030/user/${id}`, info)
    return data;
}

export async function getUserOrders(id) {
    const { data } = await axios.get(`http://localhost:3030/user/orders/${id}`)
    return data;
}