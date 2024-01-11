import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/AddCategory.css';
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import { storage } from '../../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UpdateUser({ getUser, newUser }) {
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState(getUser.username);
    const [email, setEmail] = useState(getUser.email);
    const [UserImage, setUserImage] = useState(getUser.profile);
    const [userRole, setUserRole] = useState(getUser.role)
    const [check, setCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (check) {
            const storageRef = ref(storage, `images/${UserImage.name}`);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, UserImage).then((snapshot) => {
                // When file is uploaded then make a download url

                getDownloadURL(snapshot.ref)
                    .then((url) => {

                        // Connect to our backend
                        const payload = { username: userName, email, profile: check ? url : UserImage, role: userRole }

                        // Connect to our backend
                        axios.put(`/api/user/update-user`, payload)
                            .then(json => {
                                newUser(json.data.users)
                                setShow(false)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    });


                // Matlab jo name backend mein recieve karne k lye diya ditto wohi yahan dena h
            })
        }

        else {

            // Connect to our backend
            const payload = { username: userName, email, profile: check ? url : UserImage, role: userRole }

            // Connect to our backend
            axios.put(`/api/user/update-user`, payload)
                .then(json => {
                    newUser(json.data.users)
                    setShow(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
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
                    <form className="User-form" onSubmit={handleSubmit}>
                        <p className="User-form-title">Update User</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter User Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter Category"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                            />
                        </div>
                        <div className='User-file'>
                            <label className="custom-file-upload m-4 p-4" htmlFor="file" style={{ cursor: 'pointer', border: "2px dashed #cacaca", height: '100px' }}>
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="" style={{ height: '40px' }} viewBox="0 0 24 24">
                                        <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                        <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 10 11 9.55228 11 9V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="text">
                                    <span>Click to upload image</span>
                                </div>
                                <input
                                    className='add-image-file'
                                    type="file"
                                    id="file"
                                    // onClick={() => setCheck(true)}
                                    onChange={(e) => (
                                        e.target.files[0] ? (setUserImage(e.target.files[0]), setCheck(true)) : setCheck(false)
                                    )}
                                />
                            </label>
                            <h4 className='ms-5 mb-4'>{check ? UserImage.name : null}</h4>
                        </div>

                        <button
                            type="submit"
                            className="submit"
                        >
                            Update User
                        </button>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateUser;