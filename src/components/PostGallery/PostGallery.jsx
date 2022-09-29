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
  setFollowingPosts,
  loggedUser,
  setPosts,
  setProfileUser,
  itemsPerRow,
}) {




  return (
    <Card.Group itemsPerRow={itemsPerRow} stackable>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : null}
      {/* This didn't work */}
      {/* {posts.sort((a,b)=> (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))} */}
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
            setFollowingPosts={setFollowingPosts}
            loggedUser={loggedUser}
            setPosts={setPosts}
            setProfileUser={setProfileUser}
          />
        );
      })}
    </Card.Group>
  );
}
