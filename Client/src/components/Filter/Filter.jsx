import { useEffect, useState } from 'react';
import Rating from '../Rating/Rating';
import './Filter.css';
import Form from 'react-bootstrap/Form';
import { useCart } from '../../context/Context';
import { Navbar, FormControl } from 'react-bootstrap'

const Filter = () => {

    const { productState: {
        byStock,
        sort,
        byFastDelivery,
        byRating,
        searchQuery
    }, productDispatch } = useCart();

    const [width, setWidth] = useState(false);
    const getWidth = window.innerWidth

    useEffect(() => {
        if (getWidth <= 1185) {
            setWidth(true)
        }
    }, [])

    return (
        <div className='filter'>
            <h1 className='text-center pt-3 fw-semibold'>Filter Products</h1>
            {
                width ? (
                    <div className="search-filter mt-4">
                        <Navbar.Text>
                            <FormControl
                                style={{ width: '80%' }}
                                placeholder='Search a product'
                                className='m-auto'
                                onChange={(e) => {
                                    productDispatch({
                                        type: 'FILTER_BY_SEARCH',
                                        payload: e.target.value
                                    })
                                }}
                            />
                        </Navbar.Text>
                    </div>
                ) : (
                    null
                )
            }
            <div className="main-content d-flex flex-column gap-4 ms-4 mt-xl-5 mt-lg-3 mt-3">
                <div>
                    <Form.Check
                        inline
                        label='Ascending'
                        name='group1'
                        type='radio'
                        id={`inline-1`}
                        onChange={() => productDispatch({
                            type: 'SORT_BY_PRICE',
                            payload: 'lowToHigh'
                        })}
                        checked={sort === 'lowToHigh' ? true : false}
                    />
                </div>
                <div>
                    <Form.Check
                        inline
                        label='Descending'
                        name='group1'
                        type='radio'
                        id={`inline-2`}
                        onChange={() => productDispatch({
                            type: 'SORT_BY_PRICE',
                            payload: 'highToLow'
                        })}
                        checked={sort === 'highToLow' ? true : false}
                    />
                </div>
                <div>
                    <Form.Check
                        inline
                        label='Include out of stock'
                        name='group1'
                        type='checkbox'
                        id={`inline-3`}
                        onChange={() => productDispatch({
                            type: 'FILTER_BY_STOCK',
                        })}
                        checked={byStock}
                    />
                </div>
                <div>
                    <Form.Check
                        inline
                        label='Fast Delivery Only'
                        name='group1'
                        type='checkbox'
                        id={`inline-4`}
                        onChange={() => productDispatch({
                            type: 'FILTER_BY_DELIVERY',
                        })}
                        checked={byFastDelivery}
                    />
                </div>
                <div className='d-flex gap-2 rating-side'>
                    <p className='fw-semibold me-2 text-decoration-underline'>Rating: </p>
                    <Rating
                        rating={byRating}
                        onClick={(i) => productDispatch({
                            type: 'FILTER_BY_RATING',
                            payload: i + 1
                        })}
                    />
                </div>
                <button
                    className='btn btn-dark w-50'
                    onClick={() => productDispatch({
                        type: 'CLEAR_FILTERS'
                    })}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    )
}

export default Filter