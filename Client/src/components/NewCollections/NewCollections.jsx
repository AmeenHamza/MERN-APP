import React, { useState } from 'react'
import './NewCollections.css';
import Card from '../Card/Card';
import { useCart } from '../../context/Context';

const NewCollections = () => {

    const { state: { products } } = useCart();
    const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];

    const result = products.reduce((accumulator, product) => {
        const categoryIndex = categories.indexOf(product.category);

        if (categoryIndex !== -1 && accumulator[categoryIndex].length < 2) {
            accumulator[categoryIndex].push(product);
        }

        return accumulator;
    }, Array.from({ length: categories.length }, () => []));

    const [mens, women, jewellery, electronics] = result;

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {
                    mens.map((prod) => (
                        <Card key={prod.id} details={prod} />
                    ))
                }
                {
                    women.map((prod) => (
                        <Card key={prod.id} details={prod} />
                    ))
                }
                {
                    jewellery.map((prod) => (
                        <Card key={prod.id} details={prod} />
                    ))
                }
                {
                    electronics.map((prod) => (
                        <Card key={prod.id} details={prod} />
                    ))
                }
            </div>
        </div>
    )
}

export default NewCollections