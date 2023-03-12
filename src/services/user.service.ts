import { omit } from 'lodash';
import { FilterQuery, InferSchemaType } from 'mongoose';
import { UserDocument, UserModel } from 'src/models/user.model';

const createUser = async (input: InferSchemaType<UserDocument>) => {
  try {
    const user = await UserModel.create(input);
    return omit(
      user.toJSON(),
      'password',
      'updatedAt',
      '__v',
      'comparePassword'
    );
  } catch (ex: any) {
    throw new Error(ex);
  }
};

const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
};

const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};

export { createUser, validatePassword, findUser };
