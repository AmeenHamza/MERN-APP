import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import './Checkout.css';
import { useCart } from '../../context/Context';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { Checkout } from '../../pages';
import { Link, useNavigate } from 'react-router-dom';

function CheckoutForm() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("")
    const [totalBill, setTotalBill] = useState("");

    const { state: { cart }, userState: { user }, dispatch } = useCart();

    const navigate = useNavigate()

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
        const roundedTotal = parseFloat(total.toFixed(2));
        setTotalBill(roundedTotal)
        if (user) {
            const getDecode = jwtDecode(Cookies.get("token"));
            setName(getDecode.username)
            setEmail(getDecode.email)
        }
    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        const payload = { items: cart, customerName: name, customerEmail: email, customerAddresss: address, customerContact: contact, totalBill }

        const orderDetails = {
            name,
            email,
            address,
            contact,
            totalBill,
            items: cart,
            payload
        }

        dispatch({
            type: 'GET_ORDER_DETAILS',
            payload: orderDetails
        })

        // getDetails(orderDetails)
        setShow(false);
    }

    return (
        <>
            <button
                className='submit'
                onClick={handleShow}
                disabled={cart.length === 0}
            >
                Place Order
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form className="brand-form" onSubmit={handleSubmit}>
                        <p className="brand-form-name fs-3 text-center fw-bold">Place Order</p>
                        <div className="input-container">
                            <b>Customer Name: </b>
                            <input
                                type="text"
                                placeholder="Enter Customer Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='d-flex align-items-center justify-content-center gap-4'>
                            <div className="input-container">
                                <b>Customer Email: </b>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <b>Customer Address: </b>
                                <input
                                    type="text"
                                    placeholder="Enter Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-container">
                            <b>Customer Contact: </b>
                            <input
                                type="text"
                                placeholder="Enter Customer Contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        <div className='d-flex align-items-center justify-content-center gap-4'>
                            <div className="input-container">
                                <b>Total Bill: </b>
                                <input
                                    type="text"
                                    placeholder="Place Status"
                                    disabled
                                    value={totalBill}
                                />
                            </div>
                        </div>
                        <button
                            className='submit'
                            type='submit'
                            onClick={() => setTimeout(() => {
                                navigate('/checkout')
                            }, [1000])}
                        >
                            Checkout
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}



export default CheckoutForm