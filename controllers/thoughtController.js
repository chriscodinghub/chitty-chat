const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
//   API Route: GET /api/thoughts

// Request Body: No request body is required.
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  //   API Route: GET /api/thoughts/:thoughtId
    // Request Body: No request body is required
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
//   API Route: POST /api/thoughts
//   Request Body:
//   {
//     "username": "chris",
//     "thoughtText": "Making it happen captain!"
//   }
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: thought.userId },
        { $push: { thoughts: thought._id } }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by its _id
//   API Route: PUT /api/thoughts/:thoughtId

// Request Body:
// {
//   "thoughtText": "Updated thought text"
// }
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//   // Remove a thought by its _id
//   API Route: DELETE /api/thoughts/:thoughtId

// Request Body: No request body is required.
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await User.findOneAndUpdate(
        { _id: thought.userId },
        { $pull: { thoughts: thought._id } }
      );
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction for a thought
//   API Route: POST /api/thoughts/:thoughtId/reactions

// Request Body:
// {
//   "reactionBody": "Cool reaction",
//   "username": "chris"
// }
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//   // Delete a reaction from a thought
//   API Route: DELETE /api/thoughts/:thoughtId/reactions/:reactionId

// Request Body: No request body is required.
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};