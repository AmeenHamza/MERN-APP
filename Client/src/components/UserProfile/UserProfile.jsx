import React, { useState } from 'react';
import './UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../../context/Context';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../Admin/utils/FirebaseConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FidgetSpinner } from 'react-loader-spinner'

function UserProfile() {
    const { userState: { details }, userDispatch } = useCart();
    const [name, setName] = useState(details.username);
    const [email, setEmail] = useState(details.email)
    const [image, setImage] = useState(details.profile);
    const [check, setCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const newSelectedImage = e.target.files[0];

        if (newSelectedImage) {
            setImage(newSelectedImage);
            setCheck(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const storageRef = ref(storage, `images/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const url = await getDownloadURL(snapshot.ref);

            const payload = { username: name, email, role: details.role, profile: check ? url : image };

            const json = await axios.put(`/api/user/update-user`, payload);

            // Dispatch 'GET_DETAILS'
            userDispatch({
                type: 'GET_DETAILS',
                payload: json.data.updated_user
            });

            // Delay for a certain time (e.g., 1000 milliseconds or 1 second)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dispatch 'LOGOUT'
            userDispatch({
                type: 'LOGOUT'
            });

            // Delay again if needed
            await new Promise(resolve => setTimeout(resolve, 100));

            // Dispatch 'LOGIN'
            Cookies.set("token", json.data.token, { expires: 7 });
            userDispatch({
                type: 'LOGIN'
            });

            setIsLoading(false);

            navigate('/');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                rel="stylesheet"
            />
            {
                isLoading ? (
                    <div className="custom-loader">
                        <FidgetSpinner
                            visible={true}
                            height="100"
                            width="100"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            ballColors={['#ff0000', '#00ff00', '#0000ff']}
                            backgroundColor="#F4442E"
                        />
                    </div>
                ) : (
                    <div className="container bootstrap snippets bootdeys">
                        <div className="row">
                            <div className="col-xs-12 col-sm-9">
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <div className="panel panel-default">
                                        <div className="panel-body text-center">
                                            <img
                                                src={check ? URL.createObjectURL(image) : image}
                                                className="img-circle profile-avatar"
                                                alt="User avatar"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-4">
                                        <label className="col-sm-2 text-start mb-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input
                                                type='text'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-4">
                                        <label className="col-sm-2 text-start mb-2 control-label">E-mail address</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-4">
                                        <label className="col-sm-2 text-start mb-2 control-label">Role</label>
                                        <div className="col-sm-10">
                                            <input
                                                disabled
                                                type="text"
                                                className="form-control"
                                                value={details.role}
                                            />
                                        </div>
                                    </div>
                                    <div className='brand-file'>
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
                                                // value={image}
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <h3>{check ? image.name : null}</h3>
                                    </div>
                                    <div className="form-group my-4">
                                        <div className="col-sm-10 col-sm-offset-2">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                            <button type="reset" className="btn btn-default">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default UserProfile;
