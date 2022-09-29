import React, { useCallback, useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { deletePost } from "../../utils/postApi";
import * as postsAPI from "../../utils/postApi";
import { useParams } from "react-router-dom";
import userService from "../../utils/userService";

function PostCard({
  post,
  isProfile,
  addLike,
  removeLike,
  addFollower,
  removeFollower,
  loggedUser,
  setPosts,
  setProfileUser,
  setFollowingPosts,
}) {
  const { username } = useParams();
  //const usersPosts = [];
  const [userPost, setUserPost] = useState({});

  // LIKES
  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser?.username
  );

  const likeColor = likedIndex > -1 ? "pink" : "grey";

  const likeClickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id)
      : () => addLike(post._id);

  // FOLLOWERS
  const followerIndex = post.user.followers.findIndex(function (follower) {
    return follower.username === loggedUser?.username;
  });

  const followerColor = followerIndex > -1 ? "red" : "blue";
  const followerIcon = followerIndex > -1 ? "user times" : "user plus";
  const followerClickHandler =
    followerIndex > -1
      ? () => removeFollower(post.user.followers[followerIndex]._id)
      : () => addFollower(post.user._id);

    //   async function getFollowing() {
    //     try {
    //       const response = await userService.index();
    //       const following = [];
    
    //       console.log(response, "<<--ALLL USERS>>");
    
    //       // Check every users followers to see if it contains logged in user
    //       response.data.map((user) => {
    //         for (let i = 0; i < user.followers.length; i++) {
    //           if (user.followers[i].username === loggedUser?.username) {
    //             following.push(user);
    //           }
    //         }
    //         return following;
    //       });
    
    //       console.log(
    //         following,
    //         "HERE ARE THE users that the logged user is following"
    //       );
    
    //       // fetching posts for users that the logged in user is following.
    //       for (let i = 0; i < following.length; i++) {
    //         getPosts(following[i].username);
    //       }
    //       setFollowingPosts(usersPosts);
    //  //     setLoading(false);
    //     } catch (err) {
    //       console.log(err.message, " this is the error");
    //  //     setLoading(false);
    //     }
    //   }
    //   // Get posts for a specific user
    //   async function getPosts(username) {
    //     try {
    //       const response = await userService.getProfile(username);
    //       console.log(response, "PAY ATTENTION TO THIS RESPONSE")
    //  //     setLoading(false);
    
    //         for (let i=0; i<response.data.posts.length; i++){
    //             usersPosts.push(response.data.posts[i])
    //         }
          
    
    //     } catch (err) {
    //       console.log(err.message, "<--Error");
    //     }
    //   }
    
    
    



  // DELETE
  const deleteClickHandler = () => {
    deletePost(post._id);
    isProfile ? getProfile() : getPosts();
  };

  // FEED PAGE
  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      setPosts([...response.data]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  // PROFILE PAGE
  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [username]);

  // DETAILS PAGE
  const getProfileByID = useCallback(async () => {
    try {
      const response = await userService.getProfileByID(post.user._id);

      setUserPost(response.data.user);
    } catch (err) {
      console.log(err.message, "<--Error");
    }
  }, [post.user]);

  // ON PAGE LOAD
  useEffect(() => {
    console.log("firing");

    if (isProfile) {
      if (username !== undefined) {
        //PROFILE PAGE
        getProfile();
        //getFollowing();
      } else {
        //DETAILS PAGE
        getProfileByID();
        //getFollowing();
      }
    } else {
      //FEED PAGE
      getPosts();
      //getFollowing();
    }
  }, []);











  return (
    <Card key={post._id} href={`/details/${post._id}`}>
      <Card.Content className="card">
        <Card.Header textAlign="center">
          {userPost._id === post.user ? (
            <Link to={`/${userPost.username}`}>
              <Image
                size="large"
                avatar
                src={
                  userPost.photoUrl
                    ? userPost.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {userPost.username}
            </Link>
          ) : (
            <Link to={`/${post.user.username}`}>
              <Image
                size="large"
                avatar
                src={
                  post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {post.user.username}
            </Link>
          )}
        </Card.Header>

        <br />
        <Card.Header textAlign="center">{post.title}</Card.Header>
        <br />
        <Card.Description textAlign="left">{post.lineOne}</Card.Description>
        <Card.Description textAlign="left">{post.lineTwo}</Card.Description>
        <Card.Description textAlign="left">{post.lineThree}</Card.Description>
      </Card.Content>

      {loggedUser ? (
        <Card.Content textAlign={"right"}>
          {post.user.username === loggedUser?.username ||
          (userPost._id === post.user &&
            userPost.username === loggedUser?.username) ? (
            <Link to={`#`}>
              <Icon
                name={"delete"}
                size="large"
                color={"red"}
                onClick={deleteClickHandler}
              />
            </Link>
          ) : (
            <>
              <Link to={`#`}>
                <Icon
                  name={"heart"}
                  size="large"
                  color={likeColor}
                  onClick={likeClickHandler}
                />
              </Link>
              {post.likes.length}

              <Link to={`#`}>
                <Icon
                  name={followerIcon}
                  size="large"
                  color={followerColor}
                  onClick={followerClickHandler}
                />
              </Link>
            </>
          )}
        </Card.Content>
      ) : null}
    </Card>
  );
}

export default PostCard;
