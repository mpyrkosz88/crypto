import { authActions } from "./auth-slice";
import store from "./index";

export const sendLoginData = async (enteredEmail, enteredPassword) => {
  let url = process.env.REACT_APP_LOGIN_API;

  const authData = {
    email: enteredEmail,
    password: enteredPassword,
    returnSecureToken: true,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      return response.json().then((data) => {
        console.log(data.error.message);
      });
    }
    const loginData = await response.json();
    const token = loginData.idToken;
    const localId = loginData.localId;
    const expirationDate = new Date(
      new Date().getTime() + loginData.expiresIn * 166.6
    ); // set expire time to 10 min
    localStorage.setItem("token", token);
    localStorage.setItem("localId", localId);
    localStorage.setItem("expirationDate", expirationDate);
    store.dispatch(authActions.logIn({ token, localId }));
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendRegisterData = async (enteredEmail, enteredPassword) => {
  let url = process.env.REACT_APP_REGISTER_API;

  const authData = {
    email: enteredEmail,
    password: enteredPassword,
    returnSecureToken: true,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      return response.json().then((data) => {
        console.log(data.error.message);
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
