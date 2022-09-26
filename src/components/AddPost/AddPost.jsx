import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function AddPostForm(props) {
  const [state, setState] = useState({
    title: "",
    poem: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await props.handleAddPost(state);
    } catch (err) {
      console.log(err, "<-- in Addpost handlesubmit");
    }
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="title"
          value={state.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <Form.TextArea
          className="form-control"
          name="poem"
          value={state.poem}
          placeholder="Write Haiku Here"
          onChange={handleChange}
          required
        />
        <Button type="submit" className="btn">
          Post Haiku
        </Button>
      </Form>
    </Segment>
  );
}
