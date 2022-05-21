import { DataTypes, Sequelize } from "sequelize";
import { hash } from 'bcrypt'

export default sequelize => {
    return sequelize.define('message', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [4, 64],
                    msg: "Username length should not be less than 4 and not more than 64!"
                },
                isAlphanumeric: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 16],
                    msg: "Password length should not be less than 8 and not more than 16!"
                }
            }
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, 
    {
        hooks: {
            beforeCreate: async user => user.password = await hash(user.password, process.env.bcrypt_rounds)
        }
    })
}