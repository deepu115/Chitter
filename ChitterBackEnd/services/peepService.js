import User from '../models/user.js';
import Peep from '../models/peep.js';

export const fetchAllPeeps = async () => {
    return await User.find().sort({ timestamp: -1 }).populate('user', 'username name');
};

export const addNewPeep = async (content, userId) => {
    const newPeep = new Peep({
        content,
        user: userId
    });
    return await newPeep.save();
};