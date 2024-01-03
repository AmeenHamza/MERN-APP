import React from 'react'
import './CartItems.css';
import { useCart } from '../../context/Context';
import { Checkout } from '../../pages';
import CheckoutForm from '../Checkout/CheckoutForm';
// The first name that you import isn't important but the last one is very important for using this image

const CartItems = () => {

    const { state: { cart } } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const roundedTotal = parseFloat(total.toFixed(2));

    return (
        <>
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-items">
                            <p>Subtotal</p>
                            <p>{roundedTotal} $</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <h3>Total</h3>
                            <h3>{roundedTotal} $</h3>
                        </div>
                    </div>
                    <CheckoutForm />
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className='cartitems-promobox'>
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems