import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function AddPostForm(props) {

  const [state, setState] = useState({
    title: '',
    body: '',
  });

  function handleChange(e) {
    console.log(state.title);
    console.log(state.body);
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // These are correct
    console.log(state.title);
    console.log(state.body);

    formData.append("title", state.title);
    formData.append("body", state.body);

    console.log(
      formData.forEach((item) => console.log(item)),
      " < This lets you see the key values in formData"
    );
    
    props.handleAddPost(formData);
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
          name="body"
          value={state.body}
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
