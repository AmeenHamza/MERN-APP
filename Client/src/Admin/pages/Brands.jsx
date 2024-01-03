import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/Brands.css';
import { BrandById, BrandModal, UpdateBrand } from '../components';
import { FallingLines, ColorRing } from 'react-loader-spinner';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
;

const Brands = () => {

    const [Brands, setBrands] = useState([]);
    const [check, setCheck] = useState(false)

    const getNewBrands = (values) => {
        setBrands(values);
    }

    const getUpdateBrand = (values) => {
        setBrands(values);
    }

    useEffect(() => {
        axios.get(`/api/brand/get-all-brands`)
            .then((res) => setBrands(res.data.brands))
            .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        setTimeout(() => {
            setCheck(true);
        }, 1000);
    }, [Brands])

    const handleDelete = (BrandName) => {
        // const payload = { data: { BrandName: BrandName } }; // the data option is used only when you use req.body for delete api 

        axios.delete(`/api/brand/delete-brand?BrandName=${BrandName}`)
            .then(json => {
                console.log(json.data.message);
                setBrands(json.data.brands);
            })
            .catch(err => {
                console.log(err);
                console.log("first");
            });
    };


    return (
        <div>
            <div className='d-flex align-items-center justify-content-between px-5 py-3'>
                <h2>Brands</h2>
                <div className='d-flex gap-3'>
                    <BrandModal getBrands={getNewBrands} />
                    <BrandById />
                </div>
            </div>
            {
                Brands?.length > 0 ? (
                    <div className='px-5 py-3'>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Brand Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Brands.map((brand, i) => (
                                        <tr key={i}>
                                            <th scope="row">{brand.id}</th>
                                            <td>{
                                                check ?
                                                    (<img className='br-image' src={brand.BrandImage} />)
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
                                            <td>{brand.BrandName}</td>
                                            <td>{brand.Category}</td>
                                            <td><UpdateBrand getBrand={brand} newBrand={getUpdateBrand} /></td>
                                            <td onClick={() => handleDelete(brand.BrandName)}><RiDeleteBin6Fill className='cursor' /></td>
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

export default Brands