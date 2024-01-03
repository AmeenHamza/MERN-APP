import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
;

function Updatecategory({ getcategory, newcategory }) {
    const [show, setShow] = useState(false);
    const [categoryId, setCategoryId] = useState(getcategory.id)
    const [categoryName, setCategoryName] = useState(getcategory.CategoryName);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        const payload = {id : categoryId , Name : categoryName}

        // Connect to our backend
        axios.put(`/api/category/update-category`, payload)
            .then(json => {
                newcategory(json.data.categories)
                setShow(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
                <FiEdit onClick={handleShow} className='cursor' />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <form className="category-form" onSubmit={handleSubmit}>
                        <p className="category-form-title">Update category</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter category Id"
                                value={categoryId}
                                disabled
                                onChange={(e) => setCategoryId(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit"
                        >
                            Update category
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default Updatecategory;