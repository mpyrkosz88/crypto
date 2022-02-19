import { authActions } from "./auth-slice";

export const sendLoginData = (enteredEmail, enteredPassword) => {
  return async (dispatch) => {
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
      localStorage.setItem("token", token);
      localStorage.setItem("localId", localId);
      dispatch(authActions.logIn({ token, localId }));
      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};
