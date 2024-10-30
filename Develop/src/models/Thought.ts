import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';
import dayjs from 'dayjs';

interface IThought {
  thoughtText: String;
  createdAt: Schema.Types.Date;
  username: String;
  reactions: [typeof reactionSchema];
}

// Schema to create Post model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: {
          validator: function(value) {
            return value.length >= 1 && value.length <= 280;
          },
          message: 'String must be between 1 and 280 characters long'
        }
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp:any) => dayjs(timestamp).format('MM/DD/YYYY')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

const Thoughts = model('thought', thoughtSchema);

export default Thoughts;