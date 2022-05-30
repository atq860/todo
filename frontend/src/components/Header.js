import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        // style={{ background: "#ff0000", color: "white" }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src="\logo192.png" alt="logo" className="logoImage" />
              TO-DO-LIST
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <i
                        className="fa fa-user icon-size"
                        aria-hidden="true"
                      ></i>
                    }
                    id="username"
                  >
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item style={{ fontSize: "20px" }}>
                        {userInfo.name.split(" ", 1)}
                      </ListGroup.Item>
                    </ListGroup>

                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fas fa-user icon-padding icon"></i>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
