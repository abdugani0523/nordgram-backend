import { Op } from "sequelize";
import { sign } from "#utils/jwt.js";
import ErrorClass from '#utils/Error.js'

export async function LOGIN (req, res, next) {
  
    let { username, password } = req.body;
    if (!username || !password) return next(ErrorClass.UserInputError('Username and password fields must be entered!'));

    const { models: { user } } = res.sequelize;
    const response = await user.findOne({
        where: {
            username: {
                [Op.eq]: username?.toLowerCase()
            }
        }
    });
    
    // Check exists
    if (!response) return next(ErrorClass.UserInputError('No user were found with this username!'));

    const { dataValues: find }  = response
    // Check password
    if (!await response.validPassword(password, find.password)) return next(ErrorClass.UserInputError('Username or password entered incorrectly!'));

    return res.status(201).json({
        status: 201,
        message: 'The user successfully signed in',
        token: sign({
            userAgent: req.get('User-Agent'),
            userId: find.id
        })
    })
};

export async function REGISTER (req, res, next) {
    let { username, password } = req.body
    let avatar = req.file?.filename
    if (!(username && password && avatar)) return next(ErrorClass.UserInputError('Username, password and avatar fields must be entered!'));
    const { models: { user } } = res.sequelize;
    let newUser = {
        username,
        password,
        avatar
    }
    try {
        newUser = await user.create(newUser)
    } catch(error) {
        return next(error)
    }

    return res.status(201).json({
        status: 201,
        message: 'The user successfully signed up',
        token: sign({
            userAgent: req.get('User-Agent'),
            userId: newUser.id
        })
    })
};