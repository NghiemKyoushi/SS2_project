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
  const { data } = await axios({
    method: 'post',
    url: url,
    data: body,
    credentials: 'include'
  })

  return data;


}

export async function Register(data) {
  const body = {
    name: data.name,
    username: data.username,
    email: data.email,
    imageUrl: data.imageUrl,
    password: data.password
  }
  const url = "http://localhost:8080/auth/signup";
  try {
    const postData = await axios.post(url, body)
    if (postData) {
      return postData;
    }
  } catch (e) {
    const message = "SignUp_false";
    return message;
  }

}