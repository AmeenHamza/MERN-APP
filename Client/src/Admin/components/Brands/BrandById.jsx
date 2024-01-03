import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/AddCategory.css';
import axios from 'axios';
;

function BrandById() {
    const [show, setShow] = useState(false);
    const [brandId, setBrandId] = useState("");
    const [brandDetails, setBrandDetails] = useState({})

    const brandKeys = brandDetails ? Object.keys(brandDetails).length : null;

    const handleClose = () => {
        setShow(false);
        setBrandDetails()
        setBrandId("")
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        axios.get(`/api/brand/brandbyid?brandId=${brandId}`)
            .then(json => {
                console.log(json)
                setBrandDetails(json.data.brand)
            })
            .catch(err => console.log(err))

        console.log(brandId)
    }

    const handleClear = (e) => {
        e.preventDefault();
        setBrandDetails();
        setBrandId("");
    }
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Find Brand
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
                    <form className="brand-form" onSubmit={brandDetails && brandKeys > 0 ? handleClear : handleSubmit}>
                        <p className="brand-form-title">Find Brand With Id</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter Brand Id"
                                value={brandId}
                                onChange={(e) => setBrandId(e.target.value)}
                            />
                        </div>
                        {
                            brandDetails && brandKeys > 0 ? (
                                <div className='mb-5 px-4'>
                                    <div className='w-50 mx-auto mb-3'><img className='img-fluid w-50' src={brandDetails.BrandImage} /></div>
                                    <h4>Brand Name : <span className='text-warning'>{brandDetails.BrandName}</span></h4>
                                    <h5>Brand Category : <span className='text-warning'>{brandDetails.Category}</span></h5>
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
                                brandDetails && brandKeys > 0 ? (
                                    "Clear"
                                ) : (
                                    "Find Brand"
                                )
                            }
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default BrandById;