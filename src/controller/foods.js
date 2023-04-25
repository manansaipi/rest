const getAllFoods = (req, res)=>{
    res.json({
        message: "GET all foods"
    })
}

const createFood = (req, res)=>{
    res.json({
        message: "CREATE new food"
    })
}

module.exports = {
    getAllFoods,
    createFood
}