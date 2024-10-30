import { Schema, Document, ObjectId, Types } from 'mongoose';

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      // maxlength: 280,
      validate: {
        validator: function(value) {
          return value.length <= 280;
        },
        message: 'String must be less than 280 characters long'
      }
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (timestamp:any) => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;
