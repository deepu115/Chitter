import User from '../models/user.js';
import Peep from '../models/peep.js';

exports.fetchAllPeeps = async () => {
    return await User.find().sort({ timestamp: -1 }).populate('user', 'username name');
};

exports.addNewPeep = async (content, userId) => {
    const newPeep = new Peep({
        content,
        user: userId
    });
    return await newPeep.save();
};