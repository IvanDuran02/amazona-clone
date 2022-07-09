import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Rating from "../components/Rating";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../util";
import { Store } from "../Store";

const reducer = (state, action) => {
  // copied from HomeScreen
  switch (
    action.type // we are comparing action types
  ) {
    case "FETCH_REQUEST": // return a new state( keep previous state values ) and loading should be true
      return { ...state, loading: true };
    case "FETCH_SUCCESS": // return a new state like before and update products to data coming from the action payload (contains all products from backend)
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL": // if the case fails, return previous state and error message inside action.payload
      return { ...state, loading: false, error: action.payload };
    default: // if the action isn't equal to 3 values above return current state.
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams(); // grabs params, in this case the slug.
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    // copied from HomeScreen
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    // copied from HomeScreen
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`); // we use axios to grab the json from our backend responce
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state; // deconstruct cart from state

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id); // checks if the added item is already in the cart ( checks by product ID )
    const quantity = existItem ? existItem.quantity + 1 : 1; // if the item is already in the cart(existItem) add 1, else set to 1
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      // checks if item is in stock compared to quantity user has in cart
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen;
