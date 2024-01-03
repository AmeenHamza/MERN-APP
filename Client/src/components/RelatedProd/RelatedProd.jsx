import React, { useEffect, useState } from 'react'
import './RelatedProd.css';
import Card from '../Card/Card';
import axios from 'axios';

const RelatedProd = ({ category }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err.message))
    }, [])

    return (
        <>
                <div className="related-prod">
                    <h1 className="related">Related Products</h1>
                    <div className="row justify-content-evenly">
                        {
                            products.map((prod) => (
                                <div key={prod.id} className="take col-lg-3 col-xl-3 col-md-4 col-sm-5 col-5">
                                    <Card details={prod} />
                                </div>
                            ))
                        }
                    </div>
                </div>
        </>
    )
}

export default RelatedProd