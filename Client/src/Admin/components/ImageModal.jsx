import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './css/AddCategory.css'

function ImageModal({ imageURL }) {
    const [smShow, setSmShow] = useState(false);

    return (
        <>
            <p variant='light' onClick={() => setSmShow(true)} className="me-2">
                <img className='br-image-user' src={imageURL} alt="Preview" />
            </p>
            <Modal
                size="lg"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                className='image-modal'
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{ backgroundImage: `url(${imageURL})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat : 'no-repeat', height: '80vh' }}>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ImageModal;
