import React, { useState,useEffect } from "react";
import Rating from "../components/Rating";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails} from '../actions/productActions'










const ProductDetails = () => {




  const { id } = useParams();
  


  const [qty, setQty] = useState(1);


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch]);


  const navigate = useNavigate();

  const cartPath = `/cart/${id}?qty=${qty}`;

  const addToCartHandler = () => {
    navigate(cartPath)
    
  };

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none" }} className="btn btn-light">
        <i className="fas fa-arrow-left "></i>
        &nbsp;Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup varient="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Status :</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "out of Stock"}
                </Col>
              </Row>
            </ListGroupItem>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(parseInt(product.countInStock)).keys()].map(
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Button
                className="btn-block"
                type="button"
                onClick={addToCartHandler}>
                Add to Cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
