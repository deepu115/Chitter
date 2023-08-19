
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/user.js';
import Peep from '../models/peep.js';
import dotenv from 'dotenv';
import sinon from 'sinon';


dotenv.config({ path: '.env.dev' });

chai.use(chaiHttp);
const { expect } = chai;

describe('Controller Tests', () => {
    after(async () => {
        await User.deleteMany({});
    });
    describe('Auth Controller Tests', () => {
        beforeEach(async () => {
            await User.deleteMany({});
        });
        afterEach(async () => {
            await User.deleteMany({});
        });

        it('should not signup a user with an email that already exists', async () => {
            const user = new User({
                name: 'Thor',
                username: 'GodOfThunder',
                email: 'thorodinson@gmail.com',
                password: '12345678'
            });
            await user.save();

            const res = await chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Thor',
                    username: 'Strongest Avenger',
                    email: 'thorodinson@gmail.com',
                    password: '12345678'
                });
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('msg', 'Email already registered');
        });
        it('should not signup a user with an username that already exists', async () => {
            const user = new User({
                name: 'Thor',
                username: 'GodOfThunder',
                email: 'thorodinson@gmail.com',
                password: '12345678'
            });
            await user.save();

            const res = await chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Thor',
                    username: 'GodOfThunder',
                    email: 'thor@gmail.com',
                    password: '12345678'
                });
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('msg', 'Username already taken');
        });
        it('should not login a user with an email that does not exist', async () => {
            const res = await chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'avengers@hulk.com',
                    password: '12345678'
                });
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('msg', 'Invalid Username or Password');
        });
    });
    describe('Peep Controller Additional Tests', () => {
        let sandbox = null;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });
        function simulateDatabaseError() {
            sandbox.stub(Peep, 'find').throws(new Error('Simulated DB error'));
            sandbox.stub(Peep.prototype, 'save').throws(new Error('Simulated DB error'));
        }
        it('should handle error when there is a problem fetching peeps', async () => {
            simulateDatabaseError();
            const res = await chai.request(app).get('/api/peeps');
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('msg', 'Error fetching peeps');
        });
        it('should handle error when there is a problem creating a peep', async () => {
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
            simulateDatabaseError();
            const res = await chai.request(app)
                .post('/api/peeps')
                .set('x-auth-token', token)
                .send({
                    content: 'This is a test peep.'
                });
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('msg', 'Error Creating Peep');
        });
    });

});