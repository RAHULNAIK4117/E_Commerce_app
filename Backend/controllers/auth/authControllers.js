import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/UserModel.js";





// register
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    console.log({ username, email, password });
    

    try {
        const checkUser = await User.findOne({ email });
        // console.log(checkUser.response.data);
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({
            userName: username,
            email,
            password: hashPassword
        })

        await user.save();
        res.status(200).json({
            success: true,
            message: "Registration successfull :)"
        })

    } catch (error) {
        console.log("Registration failed :: ", error);
        res.status(500).json({
            success: false,
            message: "something went wrong..."
        })

    }
}

//Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User doesn't exists!"
            })
        }

        // console.log(user);

        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(200).json({
                success: false,
                message: "Incorrect password!"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
            userName: user.userName
        }, "CLIENT_SECRET_KEY", { expiresIn: '1h' })

        // res.cookie("token", token, { httpOnly: true, secure: false }).json({
        //     success: true,
        //     message: "Login successfull :)",
        //     data: {
        //         id: user._id,
        //         email: user.email,
        //         role: user.role,
        //         userName: user.userName
        //     }
        // })

        res.status(200).json({
            success: true,
            message: "Login successfull :)",
            token,
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
                userName: user.userName
            }
        })


    } catch (error) {
        console.log("Login failed :: ", error);
        res.status(500).json({
            success: false,
            message: "something went wrong..."
        })
    }
}

// logout
const logoutUser = (req, res) => {
    res.json({
        success: true,
        message: "Logged out successfully"
    })
}

// authMiddleware
const authMiddleware = (req, res, next) => {
    const token = req.query.token ? JSON.parse(req.query.token) : null

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized user!"
        });
    }

    // console.log(token);

    try {
        const decodedUser = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decodedUser;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}

export { registerUser, loginUser, logoutUser, authMiddleware }