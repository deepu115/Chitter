import chai from 'chai';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../services/authService.js';

const { expect } = chai;

describe('AuthService Tests', () => {

    it('should hash a password', async () => {
        const password = '12345678';
        const hashedPassword = await hashPassword(password);
        expect(hashedPassword).to.not.be.null;
        expect(hashedPassword).to.not.equal(password);
    });

    it('should compare passwords correctly', async () => {
        const password = '12345678';
        const hashedPassword = await hashPassword(password);
        const isMatch = await comparePassword(password, hashedPassword);
        expect(isMatch).to.be.true;

        const isNotMatch = await comparePassword('9999999', hashedPassword);
        expect(isNotMatch).to.be.false;
    });

    it('should generate a valid JWT token for a user', () => {
        const user = {
            _id: 'Timon',
            username: 'Puma'
        };
        const token = generateToken(user);
        expect(token).to.not.be.null;

        const decodedToken = verifyToken(token);
        expect(decodedToken.id).to.equal(user._id);
        expect(decodedToken.username).to.equal(user.username);
    });

    it('should throw an error for an invalid token', () => {
        const invalidToken = 'invalidToken';
        expect(() => verifyToken(invalidToken)).to.throw();
    });

});
