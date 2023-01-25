import React , {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import FormContainer from '../components/shared/FormContainer';
import { saveShippingAddress } from '../actions/cartAction'
import { useLocation, useNavigate } from "react-router-dom";


const ShippingScreen = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch
        dispatch(saveShippingAddress({ address, city, postalcode, country }));
        navigate('/payment');
    }



  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalcode">
          <Form.Label>postalcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postalcode"
            value={postalcode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
          ></Form.Control>
              </Form.Group>
              
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen