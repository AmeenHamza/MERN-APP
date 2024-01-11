import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/Brands.css';
import { FallingLines } from 'react-loader-spinner';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CategoryById } from '../components';
import { CategoryModal, Updatecategory } from '../components';
;

const AdminCategories = () => {

  const [categories, setCategories] = useState([]);

  const getNewCategories = (values) => {
    setCategories(values);
  }

  const getUpdateCagegory = (values) => {
    setCategories(values);
  }

  useEffect(() => {
    axios.get(`/api/category/get-all-categories`)
      .then((res) => {
        setCategories(res.data.categories)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (CategoryName) => {
    // const payload = { data: { CategoryName: CategoryName } }; // the data option is used only when you use req.body for delete api 

    axios.delete(`/api/category/delete-category?CategoryName=${CategoryName}`)
      .then(json => {
        setCategories(json.data.Categories);
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <div>
      <div className='d-flex align-items-center justify-content-between px-5 py-3'>
        <h2>Categories</h2>
        <div className='d-flex gap-3'>
          <CategoryModal getCategory={getNewCategories} />
          <CategoryById />
        </div>
      </div>
      {
        categories?.length > 0 ? (
          <div className='px-5 py-3'>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((category, i) => (
                    <tr key={i}>
                      <th scope="row">{category.id}</th>
                      <td>{category.CategoryName}</td>
                      <td><Updatecategory getcategory={category} newcategory={getUpdateCagegory} /></td>
                      <td className='cursor' onClick={() => handleDelete(category.CategoryName)}><RiDeleteBin6Fill /></td>
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

export default AdminCategories