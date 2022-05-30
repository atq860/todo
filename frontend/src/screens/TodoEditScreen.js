import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, getTodoDetails } from "../actions/todoActions";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Row, Col, Form } from "react-bootstrap";
import { TODO_UPDATE_RESET } from "../constants/todoConstants";

function TodoEditScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const todoDetails = useSelector((state) => state.todoDetails);
  const { loading, error, todo } = todoDetails;

  const todoUpdate = useSelector((state) => state.todoUpdate);
  const {
    loading: loadingTodoUpdate,
    error: errorTodoUpdate,
    todo: todoUpdated,
    success,
  } = todoUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    if (success) {
      dispatch({ type: TODO_UPDATE_RESET });
      navigate(`/todo/${todo._id}`);
    } else {
      if (!todo.title || todo._id !== params.id) {
        dispatch(getTodoDetails(params.id));
      } else {
        setTitle(todo.title);
        setDescription(todo.description);
        setImage(todo.image);
      }
    }
  }, [userInfo, dispatch, success, navigate, todo]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTodo(params.id, { title, description, image }));
  };

  return (
    <>
      <h1>Edit Todo</h1>
      {loadingTodoUpdate && <Loader />}
      {errorTodoUpdate && <Message variant="danger">{errorTodoUpdate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
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
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
}

export default TodoEditScreen;
