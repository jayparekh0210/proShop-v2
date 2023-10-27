export const BASE_URL =
  process.env.NODE_ENV === "devlopment"
    ? "http://localhost:5000"
    : "https:www.yourDomain.com";

export const PRODUCT_URL = "http://localhost:5000/api/products";
export const USERS_URL = "http://localhost:5000/api/users";
export const ORDERS_URL = "http://localhost:5000/api/orders";
export const PAY_PAL_URL = "http://localhost:5000/api/config/paypal";
