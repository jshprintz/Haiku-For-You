import React from "react";
import { Card, Icon, Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { deletePost } from "../../utils/postApi";
import * as postsAPI from "../../utils/postApi";
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
}) {


  // LIKES
  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser?.username
  );

  const likeColor = likedIndex > -1 ? "green" : "grey";

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

  // DELETE
  async function deleteClickHandler() {
    deletePost(post._id);
    if (isProfile) {
      try {
        const response = await userService.getProfile(loggedUser?.username);
        setPosts([...response.data.posts]);
      } catch (err) {
        console.log(err, " err from server");
      }
    } else {
      try {
        const response = await postsAPI.getAll();
        setPosts([...response.data]);
      } catch (err) {
        console.log(err, " err from server");
      }
    }
  }

  const tempTimestamp = new Date(post.createdAt);
  const timestamp = tempTimestamp.toLocaleDateString();

  return (
    <Card key={post._id} href={`/details/${post._id}`}>
      <Card.Content className="card">
        <Card.Header textAlign="center">
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
        </Card.Header>

        <br />
        <Card.Header textAlign="center">{post.title}</Card.Header>
        <br />
        <Card.Description textAlign="left">{post.lineOne}</Card.Description>
        <Card.Description textAlign="left">{post.lineTwo}</Card.Description>
        <Card.Description textAlign="left">{post.lineThree}</Card.Description>
      </Card.Content>

      {loggedUser ? (
        <Segment raised textAlign={"right"}>
          <Card.Description textAlign="left">{timestamp}</Card.Description>

          {post.user.username === loggedUser?.username ? (
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
                  name={"thumbs up"}
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
        </Segment>
      ) : null}
    </Card>
  );
}

export default PostCard;
