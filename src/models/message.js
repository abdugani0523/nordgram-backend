import { DataTypes, Sequelize } from "sequelize";

export default sequelize => {
    return sequelize.define('message', {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
}