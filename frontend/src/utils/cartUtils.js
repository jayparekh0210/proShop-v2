export const countDecimal = (num) => {
  return ((num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Item price
  state.itemPrice = countDecimal(
    state.items.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );

  // shiping logic
  state.shipingPrice = countDecimal(state.itemPrice) > 100 ? 0 : 10;

  // taxPrice logic

  state.taxPrice = countDecimal(Number((0.15 * state.itemPrice).toFixed(2)));

  //Total Price Logic

  state.totalPrice = countDecimal(
    Number(state.itemPrice) +
      Number(state.shipingPrice) +
      Number(state.taxPrice)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
