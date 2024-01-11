import React from 'react'
import { useCart } from '../../context/Context'
import { Link } from 'react-router-dom';

const AdminHeader = () => {

  const { userState, userDispatch } = useCart();

  return (
    <div className='d-flex align-items-center justify-content-around bg-dark text-white py-3'>
      <h1 className='text-warning'>Admin ({userState.details.username})</h1>
      <div className='d-flex align-items-center gap-5'>
        <ul className='d-flex align-items-center gap-5 mt-3 fs-5'>
          <Link to='/users'>Users</Link>
          <Link to='/brands'>Brands</Link>
          <Link to='/categories'>Categories</Link>
          <Link to='/products'>Products</Link>
          <Link to='/orders'>Orders</Link>
        </ul>
        <button
          className='btn btn-light fw-semibold'
          onClick={() => userDispatch({
            type: 'LOGOUT'
          })}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminHeader