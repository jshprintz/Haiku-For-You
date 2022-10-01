import React from "react";
import { Card, Icon, Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostCard({
  post,
  addLike,
  removeLike,
  addFollower,
  removeFollower,
  loggedUser,
  removePost
}) {


  // LIKES
  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser?.username
  );

  const likeColor = likedIndex > -1 ? "teal" : "grey";

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
    try {
      removePost(post._id);

    } catch (err) {
      console.log(err,"this is the error")
    }
    
  
  }

  const tempTimestamp = new Date(post.createdAt);
  const timestamp = tempTimestamp.toLocaleDateString();

  return (
    <Card key={post._id} href={`/details/${post._id}`} className="card-background">
      <Card.Content className="card">
        <Card.Description textAlign="right" className="user-name-card user-name-card-details">
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
        </Card.Description>
        <div className="card-text">
        <br />
        <Card.Description textAlign="center"><span className="haiku-title">{post.title}</span></Card.Description>
        <br />
        <Card.Description textAlign="center">{post.lineOne}</Card.Description>
        <br />
        <Card.Description textAlign="center">{post.lineTwo}</Card.Description>
        <br />
        <Card.Description textAlign="center">{post.lineThree}</Card.Description>
        </div>
      </Card.Content>

      {loggedUser ? (
        <Segment raised textAlign={"right"}>
          <Card.Description textAlign="left"><span className="date">{timestamp}</span></Card.Description>

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
