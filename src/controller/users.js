const UsersModel = require('../models/users')

const getAllUsers = async ( req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers()
        res.json({
            message: 'GET all users',
            data: data
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
    const {body} = req

    if(!body.name || !body.username || !body.email ){
        return res.status(400).json({
            message: "Invalid input value",
            data: null
        })
    }


    try {
        await UsersModel.createNewUser(body)
        res.status(201).json({
            message: 'CREATE new user success', 
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
    
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {body} = req
    console.log('id: ', id) 
    // console.log(req.params) params -> parameter
    try {
        await UsersModel.updateUser(body, id)
       res.json({
        message : "UPDATE user success",
        data: {
            id: id,
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

const deleteUser =  async (req, res) => {
    const {id} = req.params
    const {body} = req
    console.log('id: ', id)
    try {
        const [data] = await UsersModel.getUser(id)
        console.log(data)
        if(data == ""){
            res.status(404).json({
            message : "id not found"
            })
        } else{
            await UsersModel.deleteUser(id)
            res.json({
            message : "DELETE user success",
            data: {
                id: id,
                data: body
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
module.exports = {
    getAllUsers, 
    createUser,
    updateUser,
    deleteUser
} //if exports using -> '{}' in order to import this method need to call the method name  like userController(->imported variable).getAllUsers(->method name)