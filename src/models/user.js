import { DataTypes } from "sequelize";
import { hash, compare } from 'bcrypt'

const bcrypt_rounds = parseInt(process.env.bcrypt_rounds)
export default sequelize => {
    const UserModel = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "This username is already registered!"
            },
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
                    args: [8, 64],
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
            async beforeCreate (user) {
                user.password = await hash(user.password, bcrypt_rounds)
                user.username = user.username.toLowerCase()
            }
        }
    })
    UserModel.prototype.validPassword = async (password, hash) => {
        return await compare(password, hash);
    };
    return UserModel;
}