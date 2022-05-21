import userFuntion from './user.js'
import messageFuntion from './message.js'

export default sequelize => {
    const userModel = userFuntion(sequelize)
    const messageModel = messageFuntion(sequelize)
    userModel.hasMany(messageModel)
}