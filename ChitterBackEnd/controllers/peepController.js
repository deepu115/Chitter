import { fetchAllPeeps, addNewPeep } from '../services/peepService.js';

export const getAllPeeps = async (req, res) => {
    try {
        const peeps = await fetchAllPeeps();
        res.status(200).json(peeps);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching peeps', error: error.message });
    }
}

export const createPeep = async (req, res) => {
    try {
        const peep = await addNewPeep(req.body.content, req.user.id);
        res.status(201).json(peep);
    } catch (error) {
        res.status(500).json({ msg: 'Error Creating Peep', error: error.message });
    }
}