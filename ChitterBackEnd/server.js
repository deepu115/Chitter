import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import peepRoutes from './routes/peeps.js';

config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(cors({
    origin: 'https://chitter-zbe7.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));


app.use('/api/users', userRoutes);
app.use('/api/peeps', peepRoutes);
app.use((err, req, res, next) => {
    res.status(400).json({ msg: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;