import { join, parse } from 'path'
import ErrorClass from '#utils/Error.js'

export const storageOptions = {
    destination: function (_, __, cb) {
      cb(null, join(process.cwd(), 'images'))
    },
    filename: function (_, { fieldname, originalname }, cb) {
      const { name, ext } = parse(originalname)
      cb(null, `${fieldname}-${name}-${Date.now()}${ext}`);
    }
}

export const fileFilter = (req, file, cb) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(ErrorClass.UserInputError('Only .png, .jpg and .jpeg format allowed!'));
}

export const limits = {
    fileSize: 5 * 1034 * 1024,
    fields: 2,
    files: 1
}