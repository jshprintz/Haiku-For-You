import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err, "<--ERROR IN LOGIN PAGE");
      setError(err.message);
    }
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <div className="centered">
          <br />
          <a
            href="/"
            className="large-font-size centered white-back login-title"
          >
            Haiku For You
          </a>
        </div>
        <br />
        <br />

        <Segment>
          <p className="medium-font-size" color="grey" textAlign="center">
            Log in to your account
          </p>
          <Form onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Button
                color="grey"
                fluid
                size="large"
                type="submit"
                className="btn"
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Link to="/signup">
            <Message size="big">
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Link>
          {error ? <ErrorMessage error={error} /> : null}
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
