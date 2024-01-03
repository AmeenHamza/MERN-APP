import React from 'react'
import { useCart } from '../context/Context'
import Table from 'react-bootstrap/Table';
import './css/Cart.css';
import { CartItems, Rating } from '../components';
import { MdDelete } from "react-icons/md";

const Cart = () => {

  const { state, dispatch } = useCart();

  return (
    <div className='container my-5'>
      <Table responsive='md'>
        <thead>
          <tr className='mb-4'>
            <th>Image</th>
            <th>Product Name</th>
            <th className='cart-rating'>Rating</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map((prod) => (
              <tr key={prod.id}>
                <td className='cart-img'><img className='img-fluid rounded' src={prod.image} /></td>
                <td>{prod.title.substring(1, 23)} ({prod.size})</td>
                <td className='cart-rating'>
                  <Rating
                    rating={Math.floor(prod.rating.rate)}
                    onClick={() => console.log("Don't do that!")}
                  />
                </td>
                <td>${Math.ceil((prod.price - 5) * prod.qty)}</td>
                <td>
                  <button
                    className='btn btn-dark mx-3'
                    onClick={() => dispatch({
                      type: 'CHANGE_QTY',
                      payload: {
                        id: prod.id,
                        qty: prod.qty + 1
                      }
                    })}
                  >
                    +
                  </button>
                  {prod.qty}
                  <button
                    className='btn btn-dark mx-3'
                    disabled={prod.qty === 1}
                    onClick={() => dispatch({
                      type: 'CHANGE_QTY',
                      payload: {
                        id: prod.id,
                        qty: prod.qty - 1
                      }
                    })}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-light'
                    onClick={() => dispatch({
                      type: 'REMOVE_FROM_CART',
                      payload: prod.id
                    })}
                  >
                    <MdDelete
                      color='red'
                      className='cart-delete'
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CartItems />
    </div>
  )
}

export default Cart