import React, { useState, useEffect } from "react";
import PostGallery from "../../components/PostGallery/PostGallery";
import { Grid } from "semantic-ui-react";
import userService from "../../utils/userService";


export default function Following({   
    posts,
    isProfile,
    addLike,
    removeLike,
    addFollower,
    removeFollower,
    loggedUser,
    setPosts,
}) {
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]);



  async function getFollowing() {
    try {
      const response = await userService.index();
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

      for (let i=0; i<following.length; i++){
        getPosts(following[i].username)
      }


      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }

  useEffect(() => {
    getFollowing();
  }, []);



  async function getPosts(username){
    console.log(username)
    try {
      const response = await userService.getProfile(username);
      console.log(response, "<-CHECK OUT THE RESPONSE")


      setLoading(false);
      setFollowingUsers([...response.data.posts]);;
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  };










  return (
    <Grid centered>
      <Grid.Row className="feed-gallery">
        <Grid.Column style={{ maxwidth: 350 }}>
          <h1>Here are all the posts</h1>
          <PostGallery
            posts={followingUsers}
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
