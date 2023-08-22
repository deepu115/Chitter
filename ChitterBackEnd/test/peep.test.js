import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import dotenv from 'dotenv';
import Peep from '../models/peep.js';
import { expect } from 'chai';

dotenv.config({ path: '.env.test' });

chai.use(chaiHttp);

describe('Posts API', () => {

    describe('GET /api/peeps', () => {
        it('should fetch all peeps', async () => {
            const res = await chai.request(app)
                .get('/api/peeps')
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
        });
    })

    describe('Post Peep', () => {
        let token;
        afterEach(async () => {
            await Peep.deleteMany({ content: "This is a test peep" });
        });
        it("should signup a new user", async () => {
            const res = await chai.request(app)
                .post('/api/users/signup')
                .send({
                    name: 'Ben Stokes',
                    username: 'ben07',
                    email: 'benstokes@gmail.com',
                    password: '12345678'
                });
            expect(res).to.have.status(200);
        });
        it('should login a user and get a token', async () => {
            const userCredentials = {
                email: 'benstokes@gmail.com',
                password: '12345678'
            };
            const res = await chai.request(app)
                .post('/api/users/login')
                .send(userCredentials)
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            token = res.body.token;
        });
        it('should add a new peep', async () => {
            const peep = {
                content: "This is a test peep",
            };
            const res = await chai.request(app)
                .post('/api/peeps')
                .send(peep)
                .set('x-auth-token', token)
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('content', peep.content);
        });
    });
});