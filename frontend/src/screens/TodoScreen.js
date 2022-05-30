import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoDetails } from "../actions/todoActions";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TodoScreen() {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();

  const todoDetails = useSelector((state) => state.todoDetails);
  const { loading, error, todo } = todoDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    dispatch(getTodoDetails(params.id));
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ListGroup>
            <ListGroupItem
              key={todo._id}
              style={{
                marginBottom: "1rem",
                /* background: "#D2D2D2" */ fontFamily:
                  "Arial, Helvetica, sans-serif",
              }}
            >
              <Row>
                <Col md={12}>
                  <h1 style={{ fontWeight: 100, fontSize: "1.2rem" }}>
                    Title: {todo.title}
                  </h1>
                  <h6 style={{ fontWeight: 100, fontSize: "1.2rem" }}>
                    Description:
                  </h6>
                  {todo.description}

                  <div className="mt-3">
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                      Date:{" "}
                    </span>
                    {todo?.createdAt?.substring(0, 10)}
                  </div>
                  <div>
                    {todo.image && (
                      <img
                        src={
                          todo.image ? (
                            todo.image
                          ) : (
                            <Message variant="info">No Image Found</Message>
                          )
                        }
                        style={{
                          width: "50%",
                          height: "50%",
                          // borderRadius: "50%",
                          objectFit: "cover",
                          marginTop: "3rem",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        alt={!todo.image ? "No Image" : "Image"}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </>
      )}
    </>
  );
}

export default TodoScreen;
