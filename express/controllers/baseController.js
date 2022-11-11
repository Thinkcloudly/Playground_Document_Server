const greetingsController = async (req, res) => {
    try {
        res.status(200).json("Welcome! This route is working");
    } catch (e) {
        res.status(500).json("Some Error Occuered");
    }
}


module.exports = greetingsController;