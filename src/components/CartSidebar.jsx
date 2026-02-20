import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  return (
    <div className="cart-sidebar">
      <h2>Your Order</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name} (x{item.qty})</span>
          <button onClick={() => removeFromCart(item.id)}>x</button>
        </div>
      ))}
      <hr />
      <h3>Total: ${cartTotal.toFixed(2)}</h3>
      <button className="checkout-btn">Checkout Now</button>
    </div>
  );
};
export default CartSidebar;