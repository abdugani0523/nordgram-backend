import { Op } from "sequelize";
import ErrorClass from '#utils/Error.js'

export const INFO = async (req, res, next) => {
    // User model
    const { models: { user } } = res.sequelize;

    const find = await user.findOne({
        attributes: ['id', 'username', 'avatar'],
        where: {
            id: {
                [Op.eq]: req.userId
            }
        }
    })

    if (!find) return next(ErrorClass.ValidationError('User not found!'))

    return res.status(200).json({
        status: 200,
        message: 'Success',
        data: find.dataValues
    })
} 