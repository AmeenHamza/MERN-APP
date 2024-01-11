const express = require('express')
const router = express.Router()

const { signup, login, getAllUsers, updateUser, deleteUser, findUser } = require('./Controller')

router.post('/login', login)
router.post('/signup', signup)
router.get('/getAllUsers', getAllUsers)
router.put('/update-user', updateUser)
router.delete('/delete-user', deleteUser)
router.get('/find-user', findUser)

module.exports = router