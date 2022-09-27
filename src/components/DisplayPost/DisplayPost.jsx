import React, { useEffect, useCallback, useState } from "react";
import { Segment } from "semantic-ui-react";


import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import * as postsAPI from "../../utils/postApi";
import * as usersAPI from "../../utils/userService";

export default function DisplayPostForm({ post }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailPost, setDetailPost] = useState([]);

  const dispPost = useCallback(async () => {

    
    try {
      const response = await postsAPI.getPost(post);
      setLoading(false);
      setDetailPost(response.data);
      console.log(response.data.user, "USER ID")
      

    // For some reason, this is saying that getProfileByID is not being exported.

    //   const userResponse = usersAPI.getProfileByID(detailPost.user)
    //   console.log(userResponse, "HERE IS THE USER RESPONSE")

      console.log(response, "Response");
    } catch (err) {
      console.log(err.message, "<--Error");
      setError("Poem does not exist! You are in the wrong in place.");
    }
  }, [post]);

  useEffect(() => {
    console.log("firing!");

    dispPost();
  }, []);



  if (error) {
    return (
      <>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log(detailPost, "FINAL POST")
  return (
    <Segment style={{ maxWidth: 450 }}>
      <h1>{detailPost.title}</h1>
      <h4>by {detailPost.user}</h4>
    <br />
      <h3>{detailPost.poem}</h3>
    <br />
      {/* <h5>{detailPost.likes.length} likes Created: {new Date(detailPost.createdAt)}</h5> */}
      
    </Segment>
  );
}
