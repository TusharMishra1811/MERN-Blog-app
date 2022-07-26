import { React, useState, useContext } from "react";
import { Box, styled, TextField, Button } from "@mui/material";
import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";

const ImageURL =
  "https://images.pexels.com/photos/802127/pexels-photo-802127.jpeg?auto=compress&cs=tinysrgb&w=600";

const BodyBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d8e1ed;
  height: 100vh;
  width: 100vw;
`;

const InnerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 80vh;
  box-shadow: 5px 10px 5px 2px rgb(0 0 0/ 0.6);
  background: white;
`;

const ImageBox = styled(Box)`
  display: flex;
  width: 50%;
  height: 100%;
`;

const TextBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const ImageComp = styled("img")({
  height: "100%",
  width: "100%",
});

const HeadingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  height: 30%;
  & > h1 {
    font-size: 2.8rem;
    font-family: cursive;
  }

  padding-top: 10px;
  & > p {
    color: gray;
    font-size: 1.5rem;
    font-family: cursive;
    padding-top: 10px;
  }
`;

const TextFieldBox = styled(Box)`
  display: flex;
  align-items: left;
  flex-direction: column;
  height: 40%;
  width: 80%;
  & > div {
    padding-bottom: 45px;
  }
`;

const ButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 30%;
  width: 80%;
  justify-content: space-between;
`;

const LoginButtonStyled = styled(Button)`
  height: 40px;
  width: 200px;
  background: #d61c4e;
  &:hover {
    background: #d61c4e;
  }
`;

const SignupButtonStyled = styled(Button)`
  height: 40px;
  width: 200px;
  color: #d61c4e;
  border-color: #d61c4e;
  &:hover {
    border-color: #d61c4e;
  }
`;

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");

  const loginInitialValues = {
    name: "",
    username: "",
    password: "",
  };

  const signupInitialValues = {
    name: "",
    username: "",
    password: "",
  };

  const [signup, setSignup] = useState(signupInitialValues);

  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValues);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setSignup(signupInitialValues);
      toggleAccount("login");
      setError("");
    } else {
      setError("Something went wrong Please try again later");
    }
  };
  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      setError("");
      navigate("/");
      isUserAuthenticated(true);
    } else {
      setError("Something went wrong Please try again later");
    }
  };

  return (
    <BodyBox>
      <InnerBox>
        {account === "login" ? (
          <TextBox>
            <HeadingBox>
              <h1>Welcome Back to Blog Tyrant</h1>
              <p>It's great to have you back!</p>
            </HeadingBox>

            <TextFieldBox>
              <TextField
                id="standard-basic"
                label="Username"
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="username"
                value={login.username}
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                onChange={(e) => onValueChange(e)}
                name="password"
                value={login.password}
              />
            </TextFieldBox>
            <ButtonBox>
              <LoginButtonStyled
                variant="contained"
                onClick={() => loginUser()}
              >
                Login
              </LoginButtonStyled>
              <SignupButtonStyled
                variant="outlined"
                onClick={() => {
                  account === "login"
                    ? toggleAccount("signup")
                    : toggleAccount("login");
                }}
              >
                Sign Up
              </SignupButtonStyled>
            </ButtonBox>
          </TextBox>
        ) : (
          <TextBox>
            <HeadingBox>
              <h1>Welcome Back to Blog Tyrant</h1>
              <p>It's great to have you back!</p>
            </HeadingBox>
            <TextFieldBox>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                name="name"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                id="standard-basic"
                label="Username"
                variant="standard"
                name="username"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                onChange={(e) => onInputChange(e)}
              />
            </TextFieldBox>
            {error && <p>{error}</p>}
            <ButtonBox>
              <LoginButtonStyled
                variant="contained"
                style={{ marginTop: "30px" }}
                onClick={() => signupUser()}
              >
                Sign Up
              </LoginButtonStyled>
              <SignupButtonStyled
                variant="outlined"
                style={{ marginTop: "30px" }}
                onClick={() => {
                  account === "login"
                    ? toggleAccount("signup")
                    : toggleAccount("login");
                }}
              >
                Login
              </SignupButtonStyled>
            </ButtonBox>
          </TextBox>
        )}

        <ImageBox>
          <ImageComp src={ImageURL} />
        </ImageBox>
      </InnerBox>
    </BodyBox>
  );
};

export default Login;
