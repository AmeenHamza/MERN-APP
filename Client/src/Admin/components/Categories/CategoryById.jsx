import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
;

function CategoryById() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDetails, setcategoryDetails] = useState({})

    const categoryKeys = categoryDetails ? Object.keys(categoryDetails).length : null;

    const handleClose = () => {
        setShow(false);
        setcategoryDetails()
        setCategoryName("")
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        axios.get(`/api/category/category-by-id?CategoryName=${categoryName}`)
            .then(json => {
                console.log(json)
                setcategoryDetails(json.data.Category)
            })
            .catch(err => console.log(err))

        console.log(categoryName)
    }

    const handleClear = (e) => {
        e.preventDefault();
        setcategoryDetails();
        setCategoryName("");
    }
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Find category
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
                    <form className="category-form" onSubmit={categoryDetails && categoryKeys > 0 ? handleClear : handleSubmit}>
                        <p className="category-form-title">Find category With Id</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        {
                            categoryDetails && categoryKeys > 0 ? (
                                <div className='mb-5 px-4'>
                                    <h4>Category Name : <span className='text-warning'>{categoryDetails.CategoryName}</span></h4>
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
                                categoryDetails && categoryKeys > 0 ? (
                                    "Clear"
                                ) : (
                                    "Find category"
                                )
                            }
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default CategoryById;