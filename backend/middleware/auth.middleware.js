require("dotenv").config();
const jwt = require("jsonwebtoken");



const authMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies?.token;
        // console.log(req.cookies)

      

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        console.log(decoded)

        req.user = decoded
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = authMiddleware;