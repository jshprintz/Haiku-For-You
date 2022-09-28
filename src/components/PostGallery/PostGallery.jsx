import React from "react";
import { Card, Dimmer, Segment, Image } from "semantic-ui-react";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";

export default function PostGallery({
  posts,
  isProfile,
  loading,
  removeLike,
  addLike,
  addFollower,
  removeFollower,
  loggedUser,
  setPosts,
  setProfileUser
}) {



  console.log(posts, "<------POSTS IN POST GALLERY")
  return (
    <Card.Group itemsPerRow={3} stackable>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : null}
      {posts.map((post) => {
        return (
          <PostCard
            post={post}
            key={post._id}
            isProfile={isProfile}
            removeLike={removeLike}
            addLike={addLike}
            addFollower={addFollower}
            removeFollower={removeFollower}
            loggedUser={loggedUser}
            setPosts={setPosts}
            setProfileUser={setProfileUser}
          />
        );
      })}
    </Card.Group>
  );
}
