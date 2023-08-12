import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

chai.use(chaiHttp);
const { expect } = chai;
describe('Authorization Routes', () => {
    describe('Signup tests', () => {
        beforeEach(async () => {
            await User.deleteMany({});
        });
        after(async () => {
            await User.deleteMany({})
        })
        it("should signup a new user", async () => {
            chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'JamesBond',
                    username: 'JamesBond007',
                    email: 'bond007@mi.com',
                    password: 'spectre007'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    dotenv();
                });
        });

        it('should not register a user with an existing email', async () => {
            const user = new User({
                name: 'JamesBond',
                username: 'JamesBond007',
                email: 'bond007@mi.com',
                password: 'spectre007'
            });
            user.save()
                .then(() => {
                    chai.request(app)
                        .post('/api/users/signup')
                        .send({
                            name: 'JamesBond',
                            username: 'NoTimeToDie',
                            email: 'bond007@mi.com',
                            password: 'spectre007'
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            expect(res.body).to.have.property('msg', 'User already exists');
                        });
                });
        });
        it('should not register a user with missing fields', async () => {
            chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'JamesBond',
                    email: 'bond007@mi.com',
                    password: 'spectre007'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.have.property('msg', 'Username is required');
                });
        });
        it('should not register a user with an invalid email format', async () => {
            chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'JamesBond',
                    username: 'NoTimeToDie',
                    email: 'bond007',
                    password: 'spectre007'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.have.property('msg', 'Please include a valid email');
                });
        });
        it('should not register a user with a password less than 6 characters', async () => {
            chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'JamesBond',
                    username: 'NoTimeToDie',
                    email: 'bond007@mi.com',
                    password: '007'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.have.property('msg', 'Please enter a password with 6 or more characters');
                });
        });
        it('should not register a user with a missing name field', async () => {
            chai.request(app)
                .post('/api/users/signup')
                .send({
                    username: 'JamesBond007',
                    email: 'bond007@mi.com',
                    password: 'spectre007'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.have.property('msg', 'Name is required');
                });
        });
    });

    describe('Login tests', () => {
        before(async () => {
            const user = new User({
                name: 'James Bond',
                username: 'JamesBond007',
                email: 'bond007@mi.com',
                password: 'spectre007'
            });
            await user.save();
        });
        it('should login a user with correct credentials', async () => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'bond007@mi.com',
                    password: 'spectre0073'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                });
        });


    });
});