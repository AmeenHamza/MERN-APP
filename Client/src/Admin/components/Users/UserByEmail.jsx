import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/AddCategory.css';
import axios from 'axios';

function UserByEmail() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [userDetails, setuserDetails] = useState({})

    const userKeys = userDetails ? Object.keys(userDetails).length : null;

    const handleClose = () => {
        setShow(false);
        setuserDetails()
        setEmail("")
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect to our backend
        axios.get(`/api/user/find-user?email=${email}`)
            .then(json => {
                setuserDetails(json.data.user)
            })
            .catch(err => console.log(err))
    }

    const handleClear = (e) => {
        e.preventDefault();
        setuserDetails();
        setEmail("");
    }
    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Find User
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
                    <form className="user-form" onSubmit={userDetails && userKeys > 0 ? handleClear : handleSubmit}>
                        <p className="user-form-title">Find user</p>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Enter user email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {
                            userDetails && userKeys > 0 ? (
                                <div className='mb-5 px-4'>
                                    <div className='w-50 mx-auto mb-3'><img className='img-fluid w-50' src={userDetails.profile} /></div>
                                    <h4>User Name : <span className='text-warning'>{userDetails.username}</span></h4>
                                    <h5>User Role : <span className='text-warning'>{userDetails.role}</span></h5>
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
                                userDetails && userKeys > 0 ? (
                                    "Clear"
                                ) : (
                                    "Find user"
                                )
                            }
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserByEmail;