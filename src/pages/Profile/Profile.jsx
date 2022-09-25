import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import PostGallery from "../../components/PostGallery/PostGallery";

import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

export default function ProfilePage({ loggedUser, handleLogout }) {
  const [error, setError] = useState("");
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const { username } = useParams();

  async function addLike(postId) {
    // Where is the postId defined in the UI?

    try {
      const response = await likesAPI.create(postId);
      console.log(response, "from add like");
      getProfile();
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  async function removeLike(likeId) {
    try {
      const response = await likesAPI.removeLike(likeId);
      console.log(response, " remove like");
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts([...response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getPosts();
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username); 
      setLoading(false);
      setProfileUser(response.data.user);
      console.log(response);
    } catch (err) {
      console.log(err.message, "<--Error");
      setError("Profile does not exist! You are in the wrong in place.");
    }
  }, [username]);

  useEffect(() => {
    console.log("firing!");

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

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <Loading />
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
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
            <h3>Posts go here</h3>
            <PostGallery
            posts={posts}
            numPhotosCol={3}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
