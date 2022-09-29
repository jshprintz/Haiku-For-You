import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import PostGallery from "../../components/PostGallery/PostGallery";

import { Grid } from "semantic-ui-react";

import * as userService from "../../utils/userService";


export default function Following({   
    posts,
    isProfile,
    addLike,
    removeLike,
    addFollower,
    removeFollower,
    loggedUser,
    setPosts,
    setProfileUser, }) {
  const [loading, setLoading] = useState(true);

  async function getFollowing() {
    try {
      const response = await userService.getAll();
      const following = [];
    

      console.log(response, "<---This is the GET ALL USERS response")

      response.data.map((user) => {
        for (let i=0; i<user.followers.length; i++) {
            if (user.followers[i].username === loggedUser?.username){
                following.push(user);
            }
        }
        return following;
      })

      console.log(following, "HERE ARE THE users that the logged user is following")

      // I need to fetch the posts just for the users that are on the following list





      setPosts([...response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <Grid centered>
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ maxwidth: 350 }}>
          <h1>Here are all the posts</h1>
          <PostGallery
            posts={posts}
            isProfile={isProfile}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            itemsPerRow={3}
          />
        </Grid.Column>
        </Grid.Row>
    </Grid>
  );
}
