const {
  Schema,
  model,
  Types
} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  // set custom id to avoid confusion with parent comment _id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
}, {
  toJSON: {
    getters: true
  }
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: [true, 'Thought is required'],
    trim: true,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  reactions: [ReactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  // prevents virtuals from creating duplicate of _id as `id`
  id: false
});

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;