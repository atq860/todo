import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createTodo } from "../actions/todoActions";
import { useNavigate } from "react-router-dom";

const TodoCreateScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const todoCreate = useSelector((state) => state.todoCreate);
  const { loading, error, success } = todoCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    if (success) {
      setTitle("");
      setDescription("");
      setImage("");
      navigate("/");
    }
  }, [userInfo, navigate, success]);

  // this is async since we are passing http request
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // you can upload multiple images, but we get 1st by files[0]
    const formData = new FormData(); // this is vanila JavaScript
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  console.log("Image ", image);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTodo({
        title,
        description,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {/* {image && <Image src={image} alt="image" fluid></Image>} */}

      <FormContainer>
        <h1>Create a Todo</h1>

        {loading && <Loader />}
        {error && <Message variant="danger"> {error} </Message>}
        {/* {success && (
          <Message variant="success"> Your todo has been created </Message>
        )} */}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              row="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>

            <Form.Control
              type="file"
              label="Choose File"
              custom="true"
              onChange={uploadFileHandler}
            />

            {uploading && <Loader />}
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default TodoCreateScreen;
