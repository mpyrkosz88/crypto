import { Input, Grid, Button, Box } from "@mui/material";

// import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

const Register = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(
      event.target.value.trim().length === 0 || event.target.value.includes("@")
    );
  };

  const emailPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(
      event.target.value.trim().length === 0 ||
        event.target.value.trim().length > 3
    );
  };

  const checkFormIsValid = () => {
    setFormIsValid(
      emailIsValid &&
        passwordIsValid &&
        enteredEmail.trim().length > 0 &&
        enteredPassword.trim().length > 0
    );
  };

  useEffect(() => {
    checkFormIsValid();
  });

  const register = async () => {
    let url = process.env.REGISTER_API;
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
      navigate("/login");
      return response.json().then((data) => console.log(data));
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={1} sm={2} md={4}></Grid>
        <Grid item xs={10} sm={8} md={4} container direction="column">
          <Box component="form" autoComplete="on">
            <Input
              placeholder="Login"
              id="login"
              label="login"
              type="email"
              fullWidth
              value={enteredEmail}
              onChange={emailChangeHandler}
              error={!emailIsValid}
            />
            <Input
              placeholder="Password"
              id="password"
              label="password"
              type="password"
              fullWidth
              value={enteredPassword}
              onChange={emailPasswordHandler}
              error={!passwordIsValid}
            />
            <Box mt={1}>
              <Button
                color="primary"
                variant="contained"
                disabled={!formIsValid}
                onClick={register}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1} sm={2} md={4}></Grid>
      </Grid>
    </>
  );
};

export default Register;
