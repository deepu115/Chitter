import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/user.js';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Middleware Tests', () => {
    after(async () => {
        await User.deleteMany({});
    });
    it('should return 401 if no token is provided when creating a peep', async () => {
        const res = await chai.request(app).post('/api/peeps').send({ content: 'Test peep' });
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('msg', 'No token, authorization denied');
    });

    it('should return 401 if an invalid token is provided when creating a peep', async () => {
        const res = await chai.request(app)
            .post('/api/peeps')
            .set('x-auth-token', 'invalidToken')
            .send({ content: 'Test peep' });
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('msg', 'Token is not valid');
    });

    it('should proceed if a valid token is provided', async () => {
        const userSignup = {
            name: 'mockUser',
            username: 'mockUsername',
            email: 'mockuser@example.com',
            password: '12345678'
        };

        await chai.request(app)
            .post('/api/users/signup')
            .send(userSignup);
        const userLogin = {
            email: 'mockuser@example.com',
            password: '12345678'
        };
        const loginResponse = await chai.request(app)
            .post('/api/users/login')
            .send(userLogin);
        const token = loginResponse.body.token;
        const res = await chai.request(app)
            .post('/api/peeps')
            .set('x-auth-token', token)
            .send({ content: 'Test peep' });
        expect(res).to.have.status(201);

    });
});
