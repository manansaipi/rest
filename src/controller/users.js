const UsersModel = require('../models/users')
const config = require('../config/firbase')

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers()
        res.json({
            message: 'GET all users',
            data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createUser = async (req, res) => {
    // console.log(req.body)
    const { body } = req

    if (!body.full_name || !body.email) {
        return res.status(400).json({
            message: 'Invalid input value',
            data: null
        })
    }

    try {
        await UsersModel.createNewUser(body)
        return res.status(201).json({
            message: 'CREATE new user success', 
            data: body
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { body } = req
    console.log('id: ', id) 
    // console.log(req.params) params -> parameter
    try {
        await UsersModel.updateUser(body, id)
        res.json({
            message: 'UPDATE user success',
            data: {
                id,
                ...body
            }
        }) 
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const { body } = req
    console.log('id: ', id)
    try {
        const [data] = await UsersModel.getUser(id)
        console.log(data)
        if (data === '') {
            res.status(404).json({
                message: 'id not found'
            })
        } else {
            await UsersModel.deleteUser(id)
            res.json({
                message: 'DELETE user success',
                data: {
                    id,
                    body
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })    
    }
}

const register = async (req, res) => {
    const { body } = req
    const email = body.email
    const password = body.password

    try {
        // Create user account in Firebase Authentication
        const userRecord = await config.admin.auth().createUser({ // register using firebase-admin core modules
            email,
            password,
        })
        res.json({ 
            message: 'success regist',
            user: userRecord.toJSON() 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Failed to create user',
            serverMessage: error
        })
    }
}

const login = async (req, res) => {
    const { body } = req
    const email = body.email
    const password = body.password

    if (typeof email !== 'string' || email.trim().length === 0) {
        console.log(email)
        throw new Error('Invalid email')
    }
    try {
        // firebase auth
        const userRecord = await config.firebase.auth().signInWithEmailAndPassword(email, password) // register using firebase core modules
        res.json({
            message: 'success login',
            userRecord
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('Failed to login')
    }
}
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    register,
    login
} //if exports using -> '{}' in order to import this method need to call the method name  like userController(->imported variable).getAllUsers(->method name)