import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/Brands.css';
import { FallingLines, ColorRing } from 'react-loader-spinner';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ImageModal, UpdateUser, UserByEmail, UserModal } from '../components';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(false)

    const getNewUsers = (values) => {
        setUsers(values);
    }

    const getUpdateUser = (values) => {
        setUsers(values);
    }

    useEffect(() => {
        axios.get(`/api/user/getAllUsers`)
            .then((res) => setUsers(res.data.users))
            .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        setTimeout(() => {
            setCheck(true);
        }, 1000);
    }, [users])

    const handleDelete = (email) => {
        // const payload = { data: { BrandName: BrandName } }; // the data option is used only when you use req.body for delete api 

        axios.delete(`/api/user/delete-user?email=${email}`)
            .then(json => {
                setUsers(json.data.users);
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <div>
            <div className='d-flex align-items-center justify-content-between px-5 py-3'>
                <h2>Users</h2>
                <div className='d-flex gap-3'>
                    <UserModal getUsers={getNewUsers} />
                    <UserByEmail />
                </div>
            </div>
            {
                users?.length > 0 ? (
                    <div className='px-5 py-3 table-responsive'>
                        <table className="table table-hover responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Profile</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Joining</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{
                                                check ?
                                                    (<ImageModal imageURL={user.profile} />)
                                                    :
                                                    (<ColorRing
                                                        visible={true}
                                                        height="40"
                                                        width="40"
                                                        ariaLabel="color-ring-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="color-ring-wrapper"
                                                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                                    />)
                                            }
                                            </td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.joining}</td>
                                            <td><UpdateUser getUser={user} newUser={getUpdateUser} /></td>
                                            <td onClick={() => handleDelete(user.email)}><RiDeleteBin6Fill className='cursor' /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                ) : (
                    <div className='custom-admin'>
                        <FallingLines
                            color="#4fa94d"
                            width="120"
                            visible={true}
                            ariaLabel="falling-circles-loading"
                        />
                    </div>
                )
            }
        </div>
    )
}

export default Users