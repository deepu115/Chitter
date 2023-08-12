import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

chai.use(chaiHttp);
const { expect } = chai;
describe('Authorization Routes', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });
    describe('Signup tests', () => {
        it("should signup a new user", async () => {
            chai.request(app)
                .post('/api/users/signup')
                .send({
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
    });
    it('should not register a user with an existing email', async () => {
        const user = new User({
            username: 'JamesBond007',
            email: 'bond007@mi.com',
            password: 'spectre007'
        });
        user.save()
            .then(() => {
                chai.request(app)
                    .post('/api/users/signup')
                    .send({
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
});
