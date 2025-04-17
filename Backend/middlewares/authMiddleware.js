import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
    const token = req.query.token ? JSON.parse(req.query.token) : req.headers.authorization.split(" ")[1];

    // console.log("authorization", req.headers.authorization);
    
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized user!"
        });
    }

    // console.log(token);

    try {
        const decodedUser = jwt.verify(token, "CLIENT_SECRET_KEY");
        // console.log("decodedUser", decodedUser);
        req.userId = decodedUser.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}

export { authMiddleware }