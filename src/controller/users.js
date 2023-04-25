
const getAllUsers = (req, res) => {
    res.json({
        message: 'GET all users'
    })
}

const createUser = (req, res) => {
    res.json({
        message: 'CREATE new user success'
    })
}

module.exports = {
    getAllUsers, 
    createUser
} //if exports using -> '{}' in order to import this method need to call the method name  like userController(->imported variable).getAllUsers(->method name)