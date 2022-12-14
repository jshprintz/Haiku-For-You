import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import FeedPage from "../Feed/Feed";
import ProfilePage from "../Profile/Profile";
import MorePage from "../More/More";
import WritePage from "../Write/Write";
import DetailsPage from "../Details/Details";
import userService from "../../utils/userService";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
    navigate("/");
  }

  // if user is logged in.
  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/more"
          element={<MorePage loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/write"
          element={<WritePage loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/details/:post"
          element={
            <DetailsPage loggedUser={user} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/id/:userID"
          element={
            <DetailsPage loggedUser={user} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        />
      </Routes>
    );
  }

  // If user is not logged in
  return (
    <Routes>
      <Route
        path="/"
        element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/more"
        element={<MorePage loggedUser={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/write"
        element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/details/:post"
        element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
