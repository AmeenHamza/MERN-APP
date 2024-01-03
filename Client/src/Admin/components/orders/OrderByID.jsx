import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/AddCategory.css';
import axios from 'axios';
;

function OrderByID() {
    const [show, setShow] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [orderDetails, setOrderDetails] = useState({})

    const orderKeys = orderDetails ? Object.keys(orderDetails).length : null;

    const handleClose = () => {
        setShow(false);
        setOrderDetails()
        setOrderId("")
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        axios.get(`/api/order/order-by-id?_id=${orderId}`)
            .then(json => {
                console.log(json)
                setOrderDetails(json.data.order)
            })
            .catch(err => console.log(err))

        console.log(orderId)
    }

    const handleClear = (e) => {
        e.preventDefault();
        setOrderDetails();
        setOrderId("");
    }
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Find order
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form className="order-form" onSubmit={orderDetails && orderKeys > 0 ? handleClear : handleSubmit}>
                        <p className="order-form-title">Find order With Tracking id</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter order Name"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                        {
                            orderDetails && orderKeys > 0 ? (
                                <div className='mb-5 px-4'>
                                    <div className='w-50 mx-auto mb-3'>{orderDetails._id}</div>
                                    <h4>Customer Name : <span className='text-warning'>{orderDetails.customerName}</span></h4>
                                    <h5>Customer Email : <span className='text-warning'>{orderDetails.customerEmail}</span></h5>
                                    <h5>Customer Address : <span className='text-warning'>{orderDetails.customerAddress}</span></h5>
                                    <h5>Customer Contact : <span className='text-warning'>{orderDetails.customerContact}</span></h5>
                                    <h5>Order Status : <span className='text-warning'>{orderDetails.status}</span></h5>
                                    <h5>Order Date : <span className='text-warning'>{orderDetails.order_at}</span></h5>
                                </div>
                            ) : (
                                null
                            )
                        }
                        <button
                            type="submit"
                            className="submit"
                        >
                            {
                                orderDetails && orderKeys > 0 ? (
                                    "Clear"
                                ) : (
                                    "Find order"
                                )
                            }
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default OrderByID;