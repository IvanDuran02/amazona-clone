import { useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import logger from "use-reducer-logger"; // logger is for debugging

import axios from "axios";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (
    action.type // we are comparing action types
  ) {
    case "FETCH_REQUEST": // return a new state( keep previous state values ) and loading should be true
      return { ...state, loading: true };
    case "FETCH_SUCCESS": // return a new state like before and update products to data coming from the action payload (contains all products from backend)
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL": // if the case fails, return previous state and error message inside action.payload
      return { ...state, loading: false, error: action.payload };
    default:
      // if the action isn't equal to 3 values above return current state.
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    // logger is for debugging
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products"); // we use axios to grab the json from our backend responce
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data); // then we put it into our state
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1 className="text-5xl p-4">Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
