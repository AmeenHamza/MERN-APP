import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/Brands.css';
import { FallingLines, ColorRing } from 'react-loader-spinner';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ImageModal, ProductByName, ProductModal, UpdateProduct } from '../components';
;

const AdminProducts = () => {

    const [products, setProducts] = useState([]);

    const getNewProducts = (values) => {
        setProducts(values);
    }

    const getUpdateProduct = (values) => {
        setProducts(values);
    }

    useEffect(() => {
        axios.get(`/api/product/get-products`)
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.log(err))
    }, [])

    const handleDelete = (productId) => {
        // const payload = { data: { BrandName: BrandName } }; // the data option is used only when you use req.body for delete api 

        axios.delete(`/api/product/delete-product?id=${productId}`)
            .then(json => {
                setProducts(json.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <div>
            <div className='d-flex align-items-center justify-content-between px-5 py-3'>
                <h2>Products</h2>
                <div className='d-flex gap-3'>
                    <ProductModal getProducts={getNewProducts} />
                    <ProductByName />
                </div>
            </div>
            {
                products?.length > 0 ? (
                    <div className='px-5 py-3'>
                        <div className='table-responsive'>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product, i) => (
                                            <tr key={i}>
                                                <th scope="row">{product.id}</th>
                                                <td className='font-small'>{product.title}</td>
                                                <td>₹{product.price}</td>
                                                <td className='font-small'>{product.description}</td>
                                                <td className='font-small'>{product.category}</td>
                                                <td>{
                                                    product.image ? (
                                                        <ImageModal imageURL={product.image} />
                                                    ) : (
                                                        <ColorRing
                                                            visible={true}
                                                            height="40"
                                                            width="40"
                                                            ariaLabel="color-ring-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass="color-ring-wrapper"
                                                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                                        />
                                                    )
                                                }</td>
                                                <td>{product.rating.rate}</td>
                                                <td>{product.rating.count}</td>
                                                <td><UpdateProduct getProduct={product} newProduct={getUpdateProduct} /></td>
                                                <td onClick={() => handleDelete(product.id)}><RiDeleteBin6Fill className='cursor' /></td>
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

export default AdminProducts