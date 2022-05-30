import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listMyTodos, deleteTodo, completeTodo } from "../actions/todoActions";
import { useNavigate } from "react-router-dom";
import { TODO_CREATE_RESET } from "../constants/todoConstants";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todoListMy = useSelector((state) => state.todoListMy);
  const { loading, error, todos } = todoListMy;

  const todoDelete = useSelector((state) => state.todoDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = todoDelete;

  const todoComplete = useSelector((state) => state.todoComplete);
  const {
    loading: loadingTodoComplete,
    error: errorTodoComplete,
    success: successTodoComplete,
  } = todoComplete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: TODO_CREATE_RESET });
    dispatch(listMyTodos());
  }, [dispatch, successDelete, successTodoComplete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteTodo(id));
    }
  };

  const createTodoHandler = () => {
    navigate("/todo/create");
  };

  const completeTodoHandler = (id) => {
    console.log(id)
    dispatch(completeTodo(id));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>My Todos</h1>
        </Col>

        {/* {loadingTodoComplete && <Loader />}
        {errorTodoComplete && <Message variant="danger">{errorTodoComplete}</Message>} */}

        <Col className="text-right">
          <Button className="my-3" onClick={createTodoHandler}>
            <i className="fas fa-plus"></i> Create Todo
          </Button>
        </Col>
      </Row>

      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete} </Message>} */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo._id}>
                  <td>{todo._id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    {todo.status ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/todo/${todo._id}/edit`}>
                      <Button variant="light" className="btn-sm mr-1">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm mr-1"
                      onClick={() => deleteHandler(todo._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>

                    <LinkContainer to={`/todo/${todo._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fa fa-eye"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    {!todo.status && (
                      <Button
                        variant="light"
                        className="btn-sm mr-1"
                        onClick={() => completeTodoHandler(todo._id)}
                      >
                        Complete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {todos && todos.length === 0 && (
            <Message> You have no todos </Message>
          )}
        </>
      )}
    </>
  );
};

export default DashboardScreen;
