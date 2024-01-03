import { useCart } from '../context/Context';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckModal, CheckoutForm } from '../components';
import { useNavigate } from 'react-router-dom';
;

const Checkout = () => {
    const [orderDetails, setOrderDetails] = useState({});
    const [check, setCheck] = useState(false);
    const [response, setResponse] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);
    const { state: { cart, order_details }, dispatch } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const roundedTotal = parseFloat(total.toFixed(2));

    useEffect(() => {
        console.log(order_details);
        setOrderDetails(order_details);  // Set state using the correct variable
    }, [order_details]);

    useEffect(() => {
        console.log(orderDetails);
    }, [orderDetails]);

    const handleSubmit = () => {
        setCheckStatus(true);

        axios.post(`/api/order/place-order`, orderDetails.payload)
            .then(json => {
                console.log(json.data);
                setCheck(true);
                setCheckStatus(false);
                setResponse(json.data.tracking_id);
                dispatch({
                    type: 'EMPTY_CART'
                });
                notify();
            })
            .catch(err => {
                console.log(err);
                setCheckStatus(false); // Make sure to handle errors appropriately
            });
    };

    const notify = () => {
        toast.success('Order placed Successfully!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    return (
        <div className='checkout'>
            {checkStatus ? (
                <div className='custom-loader'>
                    <FidgetSpinner
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                        backgroundColor="#F4442E"
                    />
                </div>
            ) : (
                <>
                    <div className='d-flex align-items-center justify-content-start ps-5 py-3'>
                        <h2>Order Details</h2>
                    </div>

                    {check ? (
                        <CheckModal token={response} />
                    ) : (
                        <div className='px-5 py-3'>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">{orderDetails.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>{orderDetails.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address</th>
                                        <td>{orderDetails.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Contact</th>
                                        <td>{orderDetails.contact}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Bill</th>
                                        <td>{roundedTotal}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Products</th>
                                        <td>
                                            {orderDetails.items?.map((prod, i) => (
                                                <div key={prod.id} className='fs-6'>
                                                    <span>{i + 1}-{prod.title} - ({prod.price} $)</span>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                type="submit"
                                className="submit mt-5 w-50"
                                onClick={handleSubmit}
                            >
                                Confirm order
                            </button>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Checkout;
