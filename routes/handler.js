
const users = (req, res) => {
    res.send("all users")
}
const foods = (req, res) => {
    res.send("all foods")
}

module.exports = {users, foods}