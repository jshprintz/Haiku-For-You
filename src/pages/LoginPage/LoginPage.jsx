import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";


export default function LoginPage(props) {
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: '',
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
    navigate('/');

  } catch(err) {
    console.log(err, "<--ERROR IN LOGIN PAGE")
    setError(err.message);
  }
}


  return (
    <>
      <h1>Setup Login Page</h1>
      <ul>
        <li>Read the Login Model, You can change it to fit your needs</li>
        <li>
          Make sure you read the Login Controller, to know how it is setup to
          find the user!
        </li>
      </ul>
    </>
  );
}
