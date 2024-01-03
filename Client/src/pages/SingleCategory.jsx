import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Filter } from '../components';
import { FidgetSpinner } from 'react-loader-spinner'
import './css/SingleCategory.css';

const SingleCategory = () => {

    const [category, setCategory] = useState([]);
    const { categoryName } = useParams();
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
            .then((res) => setCategory(res.data))
            .catch((err) => console.log(err.message))
    }, [])

    return (
        <>
            <h1 style={{backgroundColor: '#1daed2'}} className='text-white text-center fs-1 p-4 m-3'>{categoryName.toUpperCase()}</h1>
            <div className="container category-container">
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <div className="row">
                            {
                                category.length > 0 ? (
                                    category.map((prod) => (
                                        <div key={prod.id} className="col-lg-4 col-xl-4 col-md-4 col-sm-5 col-5 category-item my-5">
                                            <Card details={prod} />
                                        </div>
                                    ))
                                ) : (
                                    <div className='custom-loader'>
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
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleCategory