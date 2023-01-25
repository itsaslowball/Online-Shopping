
// import React, {useState, useEffect } from "react";
// import {  Row, Col, ListGroup, Image, ListGroupItem, Button, Card } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import { getOrderDetails , payOrder } from "../actions/orderAction";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/shared/Message";
// import loader from "../components/shared/Loader";
// import axios from "axios";
// import { ORDER_PAY_RESET } from "../constants/orderConstant";



// const OrderScreen = () => {
//   const { id } = useParams();
  
//   const [sdkReady, setSdkReady] = useState(false);

//   const dispatch = useDispatch();
//   const orderPay = useSelector(state => state.orderPay);
//   const { loading: loadingPay, success: successPay } = orderPay;
//     const orderDetails = useSelector(state => state.orderDetails);
//     const { order, loading, error } = orderDetails;

    

    

//     if (!loading) {
//         //calculate price
//           const addDecimal = (num) => {
//             return (Math.round(num * 100) / 100).toFixed(2);
//           };
//           order.itemsPrice = addDecimal(
//             order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//           );
//   }
  

//   const successPaymentHandler = (paymentResult) => {
//     console.log(paymentResult)
//     dispatch(payOrder(id, paymentResult))
//   }


//   useEffect(() => {
//     const addPaypalScript = async () => {
//       const { data: clientId } = await axios.get('/api/config/paypal')
//       const script = document.createElement('script');
//       script.type = 'text/javascript'
//       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//       script.async = true

//         script.onload = () => {
//           setSdkReady(true)
//       }
//       document.body.appendChild(script);
//     }
//     if (!loader || successPay) {
//       dispatch(getOrderDetails(id));
//       dispatch({ type: ORDER_PAY_RESET });
//     }
//     else if (!order.isPaid) {
//       if (!window.paypal) {
//         addPaypalScript()
//       }
//       else {
//         setSdkReady(true);
//       }
//     }
//         dispatch(getOrderDetails(id));
//     }, [dispatch, id, order, successPay]);




//     return (
//       <>
//         <h2>Order {id}</h2>
//         <Row>
//           <Col md={8}>
//             <ListGroup.Item variant="flush">
//               <h2>Shipping</h2>

//               <p>
//                 <strong>Address: </strong>
//                 {order.shippingAddress.address}&nbsp;
//                 {order.shippingAddress.city}&nbsp;
//                 {order.shippingAddress.postalcode}&nbsp;
//                 {order.shippingAddress.country}&nbsp;
//               </p>
//               {order.isDelivered ? (
//                 <Message variant="success">
//                   {" "}
//                   Delivered {order.isDelivered}
//                 </Message>
//               ) : (
//                 <Message variant="danger">Not Delivered</Message>
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 <strong>{order.paymentMethod}</strong>
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Paid On {order.paidAt}</Message>
//               ) : (
//                 <Message variant="danger">Not Paid</Message>
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Your Cart is Empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image src={item.image} alt={item.name} fluid />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} X ${item.price} = ${item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </Col>
//           <Col md={4}>
//             <Card>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h2>Order Summary</h2>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Items</Col>
//                     <Col>${order.itemsPrice}</Col>
//                   </Row>
//                   <Row>
//                     <Col>Shipping</Col>
//                     <Col>${order.shippingPrice}</Col>
//                   </Row>
//                   <Row>
//                     <Col>Tax</Col>
//                     <Col>${order.taxPrice}</Col>
//                   </Row>
//                   <Row>
//                     <Col>Total</Col>
//                     <Col>${order.totalPrice}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   {error && <Message variant="danger">{error}</Message>}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card>
//             {!order.isPaid && (
//               <ListGroupItem>
//                 {loadingPay && <loader />}
//                 {!sdkReady ? (
//                   <loader />
//                 ) : (
//                   // <PayPalButton
//                   //   amount={order.totalPrice}
//                   //   onSuccess={successPaymentHandler}
//                   // />
//                   <Button
//                     type="button"
//                     className="btn-block"
                    
//                     onClick={successPaymentHandler}
//                   >
//                     Place Order
//                   </Button>
//                 )}
//               </ListGroupItem>
//             )}
//           </Col>
//         </Row>
//       </>
//     );

  
// }

// export default OrderScreen

import React, {useEffect} from 'react'
import { getOrderDetails } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";

const OrderScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

    useEffect(() => {
    
          dispatch(getOrderDetails(id));
    }, [dispatch, id]);
  
  const clickHandler = () => {
    navigate('/');
  }
  return (
    <>
      <h2>Your Order has been placed !!!</h2>
      <br />
      <h2>Order id : {id}</h2>

      <br />
      <br />
      <br />
      <br />
      <button onClick={clickHandler}>Return To Home Page</button>
    </>
  );
}

export default OrderScreen