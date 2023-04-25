
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
}