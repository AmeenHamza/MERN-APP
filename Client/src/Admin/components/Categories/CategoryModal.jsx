import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
;

function CategoryModal({ getCategory }) {
    const [show, setShow] = useState(false);
    const [CategoryName, setCategoryName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // For making reference of image/data-files first start with folder name and then /file-name
        const payload = { Name: CategoryName }

        // Connect to our backend
        axios.post(`/api/category/add-category`, payload)
            .then(json => {
                getCategory(json.data.Categories)
                setShow(false)
                setCategoryName("")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Add Category
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
                    <form className="Category-form" onSubmit={handleSubmit}>
                        <p className="Category-form-title">Add Category</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter Category Name"
                                value={CategoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="submit"
                        >
                            Add Category
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );

}
export default CategoryModal;