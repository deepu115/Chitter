import Peep from '../models/peep.js';

export const fetchAllPeeps = async () => {
    return await Peep.find().sort({ timestamp: -1 }).populate('user', 'name username');
};

export const addNewPeep = async (content, userId) => {
    const newPeep = new Peep({
        content,
        user: userId
    });
    return await newPeep.save();
};