import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

import { Button, Form, Grid, Segment } from "semantic-ui-react";

function isPasswordMatch(passwordOne, passwordConf) {
  return passwordOne === passwordConf;
}

export default function SignUpPage(props) {
  const [error, setError] = useState({
    message: "",
    passwordError: false,
  });

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isPasswordMatch(state.password, state.passwordConf))
      return setError({
        message: "Passwords Must Match!",
        passwordError: true,
      });
    setError({ message: "", passwordError: false });

    const formData = new FormData();

    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }

    try {
      await userService.signup(formData);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError({ message: err.message, passwordError: false });
    }
  }

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }}
      verticalAlign="middle"
      className="signup-grid"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <div className="centered">
          <a
            href="/"
            className="large-font-size centered white-back login-title"
          >
            Haiku For You
          </a>
        </div>
        <br />
        <Segment>
          <p className="medium-font-size" color="grey" textAlign="center">
            Sign Up
          </p>
          <Form onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                error={error.passwordError}
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                error={error.passwordError}
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="bio"
                name="bio"
                placeholder="Tell us more about yourself..."
                value={state.bio}
                onChange={handleChange}
              />
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFileInput}
                />
              </Form.Field>
              <Button type="submit" className="btn">
                Signup
              </Button>
            </Segment>
            {error.message ? <ErrorMessage error={error.message} /> : null}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
