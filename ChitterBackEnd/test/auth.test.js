import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import { hashPassword } from '../services/authService.js';

dotenv.config({ path: '.env.dev' });

chai.use(chaiHttp);
const { expect } = chai;

describe('Signup tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });
    afterEach(async () => {
        await User.deleteMany({});
    });
    it("should signup a new user", async () => {
        const res = await chai.request(app)
            .post('/api/users/signup')
            .send({
                name: 'JamesBond',
                username: 'JamesBond007',
                email: 'bond007@mi.com',
                password: 'spectre007'
            });
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
    });

    it('should not register a user with an existing email', async () => {
        const user = new User({
            name: 'JamesBond',
            username: 'JamesBond007',
            email: 'bond007@mi.com',
            password: 'spectre007'
        });
        await user.save();

        const res = await chai.request(app)
            .post('/api/users/signup')
            .send({
                name: 'JamesBond',
                username: 'NoTimeToDie',
                email: 'bond007@mi.com',
                password: 'spectre007'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg', 'Email already registered');
    });

    it('should not register a user with missing fields', async () => {
        const res = await chai.request(app)
            .post('/api/users/signup')
            .send({
                name: 'JamesBond',
                email: 'bond007@mi.com',
                password: 'spectre007'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg', 'Username is required');
    });

    it('should not register a user with an invalid email format', async () => {
        const res = await chai.request(app)
            .post('/api/users/signup')
            .send({
                name: 'JamesBond',
                username: 'NoTimeToDie',
                email: 'bond007',
                password: 'spectre007'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg', 'Please include a valid email');
    });

    it('should not register a user with a password less than 6 characters', async () => {
        const res = await chai.request(app)
            .post('/api/users/signup')
            .send({
                name: 'JamesBond',
                username: 'NoTimeToDie',
                email: 'bond007@mi.com',
                password: '007'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg', 'Please enter a password with 6 or more characters');
    });

    it('should not register a user with a missing name field', async () => {
        const res = await chai.request(app)
            .post('/api/users/signup')
            .send({
                username: 'JamesBond007',
                email: 'bond007@mi.com',
                password: 'spectre007'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg', 'Name is required');
    });
});

describe('Login tests', () => {
    before(async () => {
        const hashedPassword = await hashPassword('12345678');
        const user = new User({
            name: 'Harry Styles',
            username: 'Harry1',
            email: 'hstyles@gmail.com',
            password: hashedPassword
        });
        await user.save();
    });
    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should login a user with correct credentials', async () => {
        const res = await chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'hstyles@gmail.com',
                password: '12345678'
            });
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
    });

    it('should not login a user with incorrect password', async () => {
        const res = await chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'hstyles@gmail.com',
                password: '9999999'
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg', 'Invalid Username or Password');
    });

    it('should not login without an email field', async () => {
        const res = await chai.request(app)
            .post('/api/users/login')
            .send({
                password: '9999999'
            });

        expect(res).to.have.status(400);
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors[0]).to.have.property('msg', 'Please include a valid email');
    });

    it('should not login without a password field', async () => {
        const res = await chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'hstyles@gmail.com'
            });

        expect(res).to.have.status(400);
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors[0]).to.have.property('msg', 'Password is required');
    });
});