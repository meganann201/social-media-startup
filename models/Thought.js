const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
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
      }
    },
  );

const ThoughtSchema = new Schema({
  // Add these four attributes to your schema: username, password, email, userCreated
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
  reactions: [reactionSchema],
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;