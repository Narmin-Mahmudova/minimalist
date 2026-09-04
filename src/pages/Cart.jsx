import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiTrash2, FiMinus, FiPlus, FiCheckCircle, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const COUPONS = [
  { code: 'SAVE10', label: 'SAVE10', desc: '10% off', type: 'percent', value: 10 },
  { code: 'SAVE20', label: 'SAVE20', desc: '20% off', type: 'percent', value: 20 },
  { code: 'FLAT50', label: 'FLAT50', desc: '₹50 off', type: 'flat', value: 50 },
];

function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const toggleCoupon = (coupon) => {
    setAppliedCoupon(prev => (prev?.code === coupon.code ? null : coupon));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return sum + (item.oldPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === 'percent'
      ? Math.round(subtotal * (appliedCoupon.value / 100))
      : Math.min(appliedCoupon.value, subtotal)
    : 0;

  const shipping = subtotal > 500 ? 0 : 50;
  const total = Math.max(0, subtotal - couponDiscount) + shipping;

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setOrderPlaced(true);
    clearCart();
    setAppliedCoupon(null);
  };

  if (orderPlaced) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-5 text-center py-16 px-8 bg-white rounded-lg">
          <FiCheckCircle className="mx-auto text-green-500 mb-5" size={56} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2.5">Order placed successfully!</h2>
          <p className="text-gray-500 mb-8">Thank you for shopping with us. A confirmation email is on its way.</p>
          <Link to="/" className="inline-block py-3.5 px-8 bg-gray-900 text-white no-underline font-medium transition-colors duration-300 hover:bg-gray-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center py-20 px-5 bg-white rounded-lg">
            <h2 className="text-2xl text-gray-900 mb-2.5">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="inline-block py-3.5 px-8 bg-gray-900 text-white no-underline font-medium transition-colors duration-300 hover:bg-gray-800">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="bg-white rounded-lg overflow-hidden">
            {cartItems.map(item => (
              <div key={item.id} className="grid grid-cols-[80px_1fr_40px] grid-rows-[auto_1fr] gap-3 p-3 border-b border-gray-100 md:grid-cols-[100px_1fr_120px_100px_40px] md:grid-rows-1 md:items-center md:gap-5 md:p-5">
                <div className="w-20 h-20 row-span-2 self-center bg-gray-100 rounded overflow-hidden md:w-24 md:h-24 md:row-span-1">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2.5" />
                </div>
                <div className="col-start-2 row-start-1 md:col-auto md:row-auto">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-1">{item.description}</p>
                  <p className="text-sm text-gray-500">Size: {item.size || 'Default'}</p>
                </div>
                <div className="col-start-2 row-start-2 flex items-center justify-between md:contents">
                  <div className="flex items-center gap-2 md:col-start-3 md:row-start-1">
                    <button
                      className="w-8 h-8 border border-gray-200 bg-white flex items-center justify-center transition-all duration-200 hover:border-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-sm font-semibold min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      className="w-8 h-8 border border-gray-200 bg-white flex items-center justify-center transition-all duration-200 hover:border-gray-900"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="md:col-start-4 md:row-start-1 md:text-right">
                    <span className="block text-base font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                    {item.oldPrice && item.oldPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">₹{item.oldPrice * item.quantity}</span>
                    )}
                  </div>
                </div>
                <button
                  className="col-start-3 row-span-2 self-center justify-self-center bg-transparent border-none text-gray-400 cursor-pointer p-2 transition-colors duration-200 hover:text-red-500 md:col-start-5 md:row-span-1"
                  onClick={() => removeItem(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 h-fit lg:sticky lg:top-[100px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 pb-4 border-b border-gray-100">Order Summary</h3>

            <div className="mb-5 pb-5 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1.5">
                <FiTag className="w-4 h-4" /> Apply a coupon
              </p>
              <div className="flex flex-wrap gap-2">
                {COUPONS.map(coupon => (
                  <button
                    key={coupon.code}
                    onClick={() => toggleCoupon(coupon)}
                    className={`px-3 py-2 rounded border text-xs font-semibold transition-all duration-200 ${
                      appliedCoupon?.code === coupon.code
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
                    }`}
                  >
                    {coupon.label}
                    <span className="block text-[0.65rem] font-normal opacity-80">{coupon.desc}</span>
                  </button>
                ))}
              </div>
              {appliedCoupon && (
                <p className="text-xs text-green-600 mt-2.5">
                  "{appliedCoupon.code}" applied — you saved ₹{couponDiscount}
                </p>
              )}
            </div>

            <div className="flex justify-between mb-3 text-sm text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between mb-3 text-sm text-gray-500"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
            {discount > 0 && (
              <div className="flex justify-between mb-3 text-sm text-green-600"><span>Discount</span><span>-₹{discount}</span></div>
            )}
            {couponDiscount > 0 && (
              <div className="flex justify-between mb-3 text-sm text-green-600"><span>Coupon ({appliedCoupon.code})</span><span>-₹{couponDiscount}</span></div>
            )}
            <div className="flex justify-between my-5 pt-4 border-t border-gray-100 text-lg font-bold text-gray-900"><span>Total</span><span>₹{total}</span></div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-gray-900 text-white border-none text-base font-semibold cursor-pointer mb-3 transition-colors duration-300 hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
            <Link to="/" className="block text-center text-gray-500 no-underline text-sm transition-colors duration-200 hover:text-gray-900">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;