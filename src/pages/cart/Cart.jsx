import CartCard from "../../components/cartCard/CartCard";
import { useContext } from "react";
import MainContext from "../../utils/context";

export default function Cart() {
  const { username, user, loading, cartProducts } = useContext(MainContext);
  const calculateTotalPrice = () => {
    if (cartProducts) {
      let total = 0;
      cartProducts.forEach((product) => {
        total += product.price;
      });
      return total;
    } else return 0;
  };
  return loading ? (
    <div className="cart__message">Loading...</div>
  ) : !user ? (
    <div className="cart__message">Please Login To View Your Cart</div>
  ) : (
    <div className="cart">
      <div className="cart__products">
        {!cartProducts || cartProducts.length === 0 ? (
          <div className="cart__message cart__message--empty">
            Your Cart is Currently Empty...Please Add some products
          </div>
        ) : (
          cartProducts.map((product) => (
            <CartCard key={product.id} product={product} />
          ))
        )}
      </div>
      <div className="cart__checkout">
        <h1 className="cart__checkout__title">CheckOut</h1>
        <h2 className="cart__checkout__username">Username: {username}</h2>
        <p className="cart__checkout__total">
          Total: {calculateTotalPrice()} $
        </p>
        {calculateTotalPrice() !== 0 && <button>Pay</button>}
      </div>
    </div>
  );
}
