import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { envConfig } from 'config/config.env';

export interface UserDocument {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const saltWorkFactor = envConfig.SALT_WORK_FACTOR;
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password).catch(() => false);
};

const UserModel = model('User', UserSchema);

export { UserModel };
