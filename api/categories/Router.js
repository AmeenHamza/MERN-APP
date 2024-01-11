const express = require('express')
const router = express.Router()
const auth = require('../../middleware/AuthorizeUser');

const { getAllCategories, AddCategory, UpdateCategory, deleteCategory, CategoryById, dummy } = require('./Controller')

router.post('/dummy', auth, dummy)
router.get('/get-all-categories', getAllCategories)
router.post('/add-category', AddCategory)
router.put('/update-category', UpdateCategory)
router.delete('/delete-category', deleteCategory)
router.get('/category-by-id', CategoryById)

module.exports = router