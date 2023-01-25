import React, { useState } from 'react'
import { Form, Button, Col, FormCheck, NavItem } from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


const PaymentScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();

    if (!shippingAddress) {
        navigate('/shipping');
    }
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('paypal');

    const submitHandler = (e) => {
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    


  return (
    <>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Cart"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              // checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="UPI"
              id="upi"
              name="paymentMethod"
              value="upi"
              // checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  );
}

export default PaymentScreen