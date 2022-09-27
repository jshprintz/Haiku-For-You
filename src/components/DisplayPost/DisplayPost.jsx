import React, { useEffect, useCallback, useState } from "react";
import { Segment } from "semantic-ui-react";
import * as postsAPI from "../../utils/postApi";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function DisplayPostForm({ post }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //const [posts, setPosts] = useState([]);

  console.log(post, "HERE IS THE POST IN THE COMPONENT");

  const dispPost = useCallback(async () => {
    try {
      const response = await postsAPI.getPost(post);
      setLoading(false);

      //setPosts(response.data.posts);

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

  return (
    <Segment>
      <h1>The component</h1>
    </Segment>
  );
}
