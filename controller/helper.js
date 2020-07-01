import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';

const Helper = {
    /**
     * Hash Password Method
     */
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },
    /**
     * comparePassword
     */
    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(hashPassword, password);
    },
    /**
     * isValidEmail helper method
     */
    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },
    /**
     * Gnerate Token
     */
    generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
            process.env.SECRET, { expiresIn: '1d' }
        );
        return token;
    }
}

export default Helper;