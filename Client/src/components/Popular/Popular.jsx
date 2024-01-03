import React, { useState } from 'react'
import './Popular.css';
import Card from '../Card/Card';
import { useCart } from '../../context/Context';

const Popular = () => {

    const {state : {products}} = useCart();
    
    const popularInWomen = products.filter((women) => women.category === "women's clothing" );

    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {
                    popularInWomen.map((prod,index) => (
                        index < 4 ? (
                            <Card key={prod.id} details={prod} />
                        ) : (
                            null
                        )
                    ))
                }
            </div>
        </div>
    )
}

export default Popular