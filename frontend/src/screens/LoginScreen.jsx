import React, {useState, useEffect} from 'react'
import { useLocation, Link , useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'
import { login } from '../actions/userAction'
import FormContainer from '../components/shared/FormContainer'

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");


    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    let params = new URLSearchParams(location.search);
    // const redirect = location.search ? location.search.split("=")[1]:'/';
    const redirect = params.get("redirect")
    console.log(redirect);


    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/login');
      }
    },[userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch
        dispatch(login(email, password));
        navigate('/');
    }


  return (
    <>
      <FormContainer>
        <h1>SIGN IN</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {Loader}
        <Form onSubmit={submitHandler}>
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
          <Button type="submit" varient="primary">
            SIGN IN
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer ?
            <Link to={redirect ? `register?redirect=${redirect}` : "/register"}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default LoginScreen