 /* eslint-disable */
import axios from 'axios';
//create cookies to save user when they login

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function checkCookie(name) {
  var user = getCookie(name);
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

export function deleteCookie(name) {
  document.cookie =
    name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
// function save login

export async function Login(username, password) {
  axios.defaults.withCredentials = true;
  const body = {
    username: username,
    password: password
  }
  const url = "http://localhost:3030/login";
  const postData = await axios({
    method: 'post',
    url: url,
    data: body,
    credentials: 'include'
  })

  return postData;


}

export async function Register(data) {
 

}


export async function fetchUserCount() {
  const { data } = await axios.get('http://localhost:3030/user/count');
  return data;
}

export async function fetchProductCount() {
  const { data } = await axios.get('http://localhost:3030/product/count')
  return data;
}

export async function fetchCommentCount() {
  const { data } = await axios.get('http://localhost:3030/comment/count')
  return data;
}

export async function fetchOrderCount() {
  const { data } = await axios.get('http://localhost:3030/order/count')
  return data;
}

export async function getAllProducts() {
  const { data } = await axios.get('http://localhost:3030/product');
  return data;
}

export async function createProduct(product) {
  const { data } = await axios.post('http://localhost:3030/product', product);
  return data;
}

export async function editProduct(product) {
  console.log(product);
  const { data } = await axios.put('http://localhost:3030/product', product);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await axios.delete(`http://localhost:3030/product/${id}`);
}

export async function postImage(image) {
  console.log("2")
  const { data } = await axios.post('http://localhost:3030/product/image', image)
  return data;
}

export async function getAllUsers() {
  const { data } = await axios.get('http://localhost:3030/user');
  return data;
}

export async function deleteUser(id) {
  const { data } = await axios.delete(`http://localhost:3030/user/${id}`)
  return data;
}


export async function getOrders() {
  const { data } = await axios.get('http://localhost:3030/order');
  return data;
}

export async function deleteOrder(id) {
  const { data } = await axios.delete(`http://localhost:3030/order/${id}`);
  return data;
}

