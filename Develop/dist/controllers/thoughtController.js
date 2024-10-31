import { Thoughts, User } from '../models/index.js';
// gets all thoughts
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// gets a single thought
export const getSingleThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        // const thought = await Thoughts.findOne({ _id: req.params.videoId })
        // if (!thought) {
        //   return res.status(404).json({ message: 'No thought with that ID' });
        // }
        // res.json(thought);
        // return; 
        const user = await Thoughts.findById(thoughtId);
        if (user) {
            return res.json(user);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
    return;
};
// create a new thought
export const createThought = async (req, res) => {
    try {
        const thought = await Thoughts.create(req.body);
        // const user = await User.findOneAndUpdate(
        //   { _id: req.body.userId },
        //   { $addToSet: { thoughts: thought.id } },
        //   { new: true }
        // );
        // if (!user) {
        //   return res.status(404).json({
        //     message: 'thought created, but found no user with that ID',
        //   });
        // }
        // res.json('Created the thought 🎉');
        // return;
        const newThought = await Thoughts.create({ thought });
        return res.status(201).json(newThought);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    return;
};
// updates a selected thought
export const updateThought = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
// deletes a selected thought
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndDelete({ _id: req.params.videoId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        const user = await User.findOneAndUpdate({ thoughts: req.params.videoId }, { $pull: { thoughts: req.params.videoId } }, { new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'thought created but no user with this id!' });
        }
        res.json({ message: 'thought successfully deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
    return;
};
// Add a thought response
export const addThoughtReaction = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { responses: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// Remove thought response
export const removeThoughtReaction = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { responseId: req.params.responseId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
