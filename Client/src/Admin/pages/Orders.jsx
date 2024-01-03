import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/Brands.css';
import { FallingLines, ColorRing } from 'react-loader-spinner';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { UpdateOrder } from '../components';
;

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const getNeworders = (values) => {
        setOrders(values);
    }

    const getUpdateorder = (values) => {
        setOrders(values);
    }

    useEffect(() => {
        axios.get(`/api/order/get-orders`)
            .then((res) => setOrders(res.data.orders))
            .catch((err) => console.log(err))
    }, [])

    const handleDelete = (orderId) => {
        // const payload = { data: { BrandName: BrandName } }; // the data option is used only when you use req.body for delete api 

        axios.delete(`/api/order/delete-order?_id=${orderId}`)
            .then(json => {
                console.log(json.data.message);
                setOrders(json.data.orders);
            })
            .catch(err => {
                console.log(err);
                console.log("first");
            });
    };


    return (
        <div>
            <div className='d-flex align-items-center justify-content-between px-5 py-3'>
                <h2>Orders</h2>
                {/* <div className='d-flex gap-3'>
                    <orderModal getorders={getNeworders} />
                    <orderByName />
                </div> */}
            </div>
            {
                orders?.length > 0 ? (
                    <div className='px-5 py-3'>
                        <div className='table-responsive'>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tracking_id</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Customer Email</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Customer Address</th>
                                        <th scope="col">Customer Contact</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Total Bill</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, i) => (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td className='font-small'>{order._id}</td>
                                                <td>{order.customerName}</td>
                                                <td className='font-small'>{order.customerEmail}</td>
                                                <td className='font-small'>
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        {
                                                            order.items?.map((item, i) => (
                                                                <b className='' key={i}>{item.id},</b>
                                                            ))
                                                        }
                                                    </div>
                                                </td>
                                                <td className='font-small'>{order.customerAddresss}</td>
                                                <td className='font-small'>{order.customerContact}</td>
                                                <td className='font-small'>{order.status}</td>
                                                <td className='font-small'>{order.order_at}</td>
                                                {/* <td className='font-small'>{order.status}</td> */}
                                                <td className='font-small'>{order.totalBill}</td>
                                                <td><UpdateOrder getorder={order} neworder={getUpdateorder} /></td>
                                                <td onClick={() => handleDelete(order._id)}><RiDeleteBin6Fill className='cursor' /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

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

export default Orders