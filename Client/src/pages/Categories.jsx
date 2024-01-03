import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CategoryTitle } from '../components';
import { FidgetSpinner } from 'react-loader-spinner'
import './css/Categories.css';

const Category = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err.message))
  }, [])

  const images = [
    'https://www.omnetway.com/wp-content/uploads/2021/05/product-category-image-400x200.jpg',
    'https://alainmall.net/wp-content/uploads/2022/01/Website-Category-Thumbnail-Final-Jewellery.jpg',
    'https://www.gulahmedshop.com/media/wysiwyg/cms-page/01_men_clothes/22_12_01/05_inside_banner_mb.jpg',
    'https://media.istockphoto.com/id/916092484/photo/women-clothes-hanging-on-hangers-clothing-rails-fashion-design.jpg?s=612x612&w=0&k=20&c=fUpcbOITkQqitglZfgJkWO3py-jsbuhc8eZfb4sdrfE='
  ]

  return (
    <>
      <h1 className='text-center fs-3 m-3 p-4 category text-white'>Categories</h1>
      <div className='container'>
        <div className='row'>
          {
            categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={index} className="category-container col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
                  <CategoryTitle category={category} image={images[index]} />
                </div>
              ))) : (
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
    </>
  )
}

export default Category