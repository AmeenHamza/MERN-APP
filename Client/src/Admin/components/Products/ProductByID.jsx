import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/AddCategory.css';
import axios from 'axios';
;

function ProductByName() {
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState("");
    const [productDetails, setproductDetails] = useState({})

    const productKeys = productDetails ? Object.keys(productDetails).length : null;

    const handleClose = () => {
        setShow(false);
        setproductDetails()
        setProductId("")
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        axios.get(`/api/product/find-product?id=${productId}`)
            .then(json => {
                setproductDetails(json.data.product)
            })
            .catch(err => console.log(err))
    }

    const handleClear = (e) => {
        e.preventDefault();
        setproductDetails();
        setProductId("");
    }
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Find product
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
                    <form className="product-form" onSubmit={productDetails && productKeys > 0 ? handleClear : handleSubmit}>
                        <p className="product-form-title">Find product With id</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter product Name"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        {
                            productDetails && productKeys > 0 ? (
                                <div className='mb-5 px-4'>
                                    <div className='w-50 mx-auto mb-3'><img className='img-fluid w-50' src={productDetails.image} /></div>
                                    <h4>Product Name : <span className='text-warning'>{productDetails.title}</span></h4>
                                    <h5>Product Category : <span className='text-warning'>{productDetails.category}</span></h5>
                                    <h5>Product price : <span className='text-warning'>{productDetails.price}</span></h5>
                                    <h5>Product rating : <span className='text-warning'>{productDetails.rating.rate}</span></h5>
                                    <h5>Product stock : <span className='text-warning'>{productDetails.rating.count}</span></h5>
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
                                productDetails && productKeys > 0 ? (
                                    "Clear"
                                ) : (
                                    "Find product"
                                )
                            }
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductByName;