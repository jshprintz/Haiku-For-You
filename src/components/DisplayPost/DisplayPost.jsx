import React from "react";
import { Segment } from "semantic-ui-react";
import PostCard from "../PostCard/PostCard";

export default function DisplayPostForm({
  post,
  isProfile,
  addLike,
  removeLike,
  loggedUser,
  setPosts,
  setProfileUser,
}) {

  return (
    
      <PostCard
        post={post}
        key={post._id}
        isProfile={isProfile}
        removeLike={removeLike}
        addLike={addLike}
        loggedUser={loggedUser}
        setPosts={setPosts}
        setProfileUser={setProfileUser}
      />

      
  );
}
