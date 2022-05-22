export default function (socket, next) {
    socket.sequelize = process.sequelize
    next()
}