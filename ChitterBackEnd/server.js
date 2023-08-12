import dotenv from 'dotenv';
import express from 'express';
const app = express();
import cors from 'cors';

import mongoose from 'mongoose';
import users from './routes/users.js';
import peeps from './routes/peeps.js';

dotenv.config({ path: 'env.dev' });
mongoose.connect('mongodb://localhost:27017/chitter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Chitter Backend API');
});
app.use(cors());
app.use(express.json());
app.use('api/users', users);
app.use('api/peeps', peeps);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
