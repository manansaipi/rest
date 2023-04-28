
const getAllUsers = (req, res) => {
    const data = {
        id: 1,
        name: "boben"
    }
    res.json({
        message: 'GET all users',
        data: data
    })
}

const createUser = (req, res) => {
    // console.log(req.body)
    res.json({
        message: 'CREATE new user success', 
        data: req.body
    })
}

const updateUser = (req, res) => {
    const {id} = req.params
    console.log('id: ', id) 
    // console.log(req.params) params -> parameter
    res.json({
        message : "UPDATE user success",
        data: req.body
    })
}

const deleteUser = (req, res) => {
    const {id} = req.params
    console.log('id: ', id) 
    res.json({
        message : "DELETE user success",
        data: {
            id: id,
            name: "ben"
        }
    })
}
module.exports = {
    getAllUsers, 
    createUser,
    updateUser,
    deleteUser
} //if exports using -> '{}' in order to import this method need to call the method name  like userController(->imported variable).getAllUsers(->method name)