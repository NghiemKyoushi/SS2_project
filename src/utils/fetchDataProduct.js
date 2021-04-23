import axios from 'axios';


export async function getAllProduct(){
    const api = 'http://localhost:3030/product'

    const fetchPro = await axios.get(api);
    return fetchPro.data;
}


//process cart 
export async function findCart(userID){
    const api = "http://localhost:3030/cart/";

    const findCartForUser = await axios.get(api); 
    const cartDetail = findCartForUser.data.find( cart => cart.userID === userID);
    console.log(cartDetail);
    return cartDetail;
}
export async function addToCart(body){
    const api = "http://localhost:3030/cart/";
    const updateCart = await axios.put(api, body);
    return updateCart.data;
}