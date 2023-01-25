import React, {useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/shared/Loader'
import Message from "../components/shared/Message";



const HomeScreen = () => { 


  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList
  useEffect(() => {

    dispatch(listProducts());

  }, [dispatch]);

  

  var pro = products.map(function (product) {
    return (
      <Col id={product._id} md={3}>
        <ProductScreen product={product} />
      </Col>
    );
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>{pro}</Row>
      )}
    </>
  );
};

export default HomeScreen;
