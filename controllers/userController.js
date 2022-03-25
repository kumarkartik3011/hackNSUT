const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// @desc:   Register a new user
// @route:  POST /api/users/
// @access: Public

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})
    if (existingUser) {
        res.status(400)
        throw new Error('User already Exists!')
    }

    const user = await User.create({name, email, password})

    if (user) {
        await user.save()
        res.status(200)
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAppAdmin: user.isAppAdmin,
            displayPicture: user.displayPicture,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

// @desc:   Authenticate already registered users
// @route:  POST /api/users/login
// @access: Public

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && await user.matchPasswords(password)) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAppAdmin: user.isAppAdmin,
            displayPicture: user.displayPicture,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password!')
    }
})

// @desc:   Search Through the Database for a user using Name/Email via query params
// @route:  GET /api/users/
// @access: Protected

const allUsers = asyncHandler(async (req, res) => {
    const search = req.query.search ? {
        $and: [
            {
                $or: [
                    {
                        name: {
                            $regex: req.query.search,
                            $options: "i"
                        }
                    }, {
                        email: {
                            $regex: req.query.search,
                            $options: "i"
                        }
                    }
                ]
            }, 
            
            {
                _id: {$ne: req.user._id}
            }
        ]
    } : {}

    const users = await User.find(search).select('-password').sort('name')
    if (users) {
        res.status(201).json(users)
    } else {
        res.status(404)
        throw new Error('User not found')
    }


})

module.exports = {
    register,
    authUser,
    allUsers
}
