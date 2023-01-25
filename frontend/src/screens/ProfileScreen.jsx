import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";


const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  let params = new URLSearchParams(location.search);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, user } = userDetails;
    const { userInfo } = userLogin;

  
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile;
  
  
  useEffect(() => {
      if (!userInfo) {
          navigate('/login');
      }
      else {
          if (!user.name) {
              dispatch(getUserDetails('profile'));
          }
          else {
              setName(user.name);
              setEmail(user.email);
          }
      }
  }, [userInfo, navigate, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({id:user._id, name, email, password}))
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h1>UPDATE INFORMATION</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          {message && <Message variant="danger">{Message}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" varient="primary">
              UPDATE
            </Button>
          </Form>
          <Row>
            {/* <Col>
              Have and account
              <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
                Register
              </Link>
            </Col> */}
          </Row>
              </Col>
              <Col md={9}></Col>
          </Row>
    </>
  );
};

export default ProfileScreen;
