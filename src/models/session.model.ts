import { Schema, model, Types } from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
}

const SessionSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const SessionModel = model('Session', SessionSchema);

export { SessionModel };
