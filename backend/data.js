import bcrypt from "bcryptjs"; // bcrypt is a hashing algorithm that is used to encrypt passwords

const data = {
  // sample users for testing
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"), // hashes the password
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "jane@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  //sample products for testing
  products: [
    {
      name: "Nike Slim Shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px x 829px
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quaility shirt",
    },
    {
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 250,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quaility product",
    },
    {
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 25,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quaility product",
    },
    {
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 65,
      countInStock: 0,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quaility product",
    },
  ],
};

export default data;
