import React, { useState, useEffect } from "react";
import PostGallery from "../../components/PostGallery/PostGallery";
import userService from "../../utils/userService";

export default function Following({
  isProfile,
  addLike,
  removeLike,
  addFollower,
  removeFollower,
  loggedUser,
  setPosts,
}) {
  const usersPosts = [];
  const [loading, setLoading] = useState(true);
  const [followingPosts, setFollowingPosts] = useState([]);

  async function getFollowing() {
    try {
      const response = await userService.index();
      const following = [];

      console.log(response, "<<--ALLL USERS>>");

      // Check every users followers to see if it contains logged in user
      response.data.map((user) => {
        for (let i = 0; i < user.followers.length; i++) {
          if (user.followers[i].username === loggedUser?.username) {
            following.push(user);
          }
        }
        return following;
      });

      console.log(
        following,
        "HERE ARE THE users that the logged user is following"
      );

      // fetching posts for users that the logged in user is following.
      for (let i = 0; i < following.length; i++) {
        getPosts(following[i].username);
      }
      setFollowingPosts(usersPosts);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }

  useEffect(() => {
    getFollowing();
  }, []);

  // Get posts for a specific user
  async function getPosts(username) {
    try {
      const response = await userService.getProfile(username);
      console.log(response, "PAY ATTENTION TO THIS RESPONSE")
      setLoading(false);

        for (let i=0; i<response.data.posts.length; i++){
            usersPosts.push(response.data.posts[i])
        }
      

    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }

  console.log(followingPosts, "Here are the following posts")
  return (
          <PostGallery
            posts={followingPosts}
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
  );
}
