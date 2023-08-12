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
            await chai.request(app)
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
});
