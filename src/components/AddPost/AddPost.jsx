import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function AddPostForm(props) {

  const navigate = useNavigate();


  const [state, setState] = useState({
    title: "",
    lineOne: "",
    lineTwo: "",
    lineThree: "",
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
      navigate("/");
    } catch (err) {
      console.log(err, "<-- in Addpost handlesubmit");
    }
  }

  return (
    <Segment >
      <Form onSubmit={handleSubmit} >
        <Form.Input
          className="form-control"
          name="title"
          value={state.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="lineOne"
          value={state.lineOne}
          placeholder="Line One"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="lineTwo"
          value={state.lineTwo}
          placeholder="Line Two"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="lineThree"
          value={state.lineThree}
          placeholder="Line Three"
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
