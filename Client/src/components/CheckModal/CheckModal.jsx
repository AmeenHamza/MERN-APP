import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const CheckModal = ({ token }) => {
    const [smShow, setSmShow] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        setSmShow(true);
    }, [])

    return (
        <>
            <Modal
                size="lg"
                show={smShow}
                onHide={() => {
                    setSmShow(false)
                    navigate('/cart')
                }}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop="static"
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div
                     className='d-flex align-items-center justify-content-center flex-column fw-semibold ps-5 py-3'
                     style={{textTransform : 'uppercase'}}
                     >
                        <h2>Order Placed Successfully!</h2>
                        <h4 className='mt-5'>Tracking Id : {token}</h4>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CheckModal