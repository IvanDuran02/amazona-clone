import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import "../card.css";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state; // deconstruct cart from state

  const quantity = cartItems.find((item) => item._id === product._id)?.quantity; // checks if item is in cart and returns quantity
  // may delete this later^^ because its to change button to out of stock if all items are in your cart. but in real world example stock doesn't change until you buy the item.
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1; // if the item is already in the cart(existItem) add 1, else set to 1
    const { data } = await axios.get(`/api/products/${item._id}`); // ajax request to get the product
    if (data.countInStock < quantity) {
      // checks if item is in stock compared to quantity user has in cart
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <div className="item group hover:scale-110 ">
      <div className="img-box group-hover:scale-110 ">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="scale-105 -mt-4"
          />
        </Link>
      </div>
      <div className="details">
        <h2>
          {product.name}
          <br />
          <span>Brand: {product.brand}</span>
        </h2>
        <div className="price">${product.price}</div>
        <label>Ratings</label>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <label>Color</label>
        <ul className="colors">
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {product.countInStock === quantity || product.countInStock === 0 ? (
          <button
            className="text-white w-[100%]"
            onClick={() => alert("Selected Item is currently out of stock!")}
          >
            Out of Stock
          </button>
        ) : (
          <button
            onClick={() => addToCartHandler(product)}
            className="text-white w-[100%]"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
export default Product;

// <Card>
//   <Link to={`/product/${product.slug}`}>
//     <img src={product.image} alt={product.name} className="card-img-top" />
//   </Link>
//   <Card.Body>
//     <Link to={`/product/${product.slug}`}>
//       <Card.Title>{product.name}</Card.Title>
//     </Link>
//     <Rating rating={product.rating} numReviews={product.numReviews} />
//     <Card.Text>${product.price}</Card.Text>
//     {product.countInStock === quantity || product.countInStock === 0 ? (
//       <Button disabled variant="light">
//         Out of Stock
//       </Button>
//     ) : (
//       <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
//     )}
//   </Card.Body>
// </Card>
