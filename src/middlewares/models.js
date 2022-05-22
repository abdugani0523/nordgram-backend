export default (_, res, next) => {
    res.sequelize = process.sequelize
    next()
}