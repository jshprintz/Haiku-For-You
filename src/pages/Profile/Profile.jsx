import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

export default function ProfilePage({ loggedUser, handleLogout }) {
  const [error, setError] = useState("");
  const [profileUser, setProfileUser] = useState({});

  const { username } = useParams();

  const getProfile = useCallback(async () => {

    console.log(username, "<--user")

    try {
      const response = await userService.getProfile(username); // this line evaluates to what the server responds to the request with
      // after we get the response to the server
      // so lets flip the loading state
      setProfileUser(response.data.user);
      console.log(response);
    } catch (err) {
      console.log(err.message, "<--Error");
      setError("Profile does not exist! You are in the wrong in place.");
    }
  }, [username]);




  useEffect(() => {
    console.log("firing!");
    // When the page loads, lets send a get request to the server
    // to get whoever's profile page I'm on. (example, localhost:3000/jim) <-- jim's profile info I want to get

    getProfile();
  }, [username, getProfile]);





  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />;
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
