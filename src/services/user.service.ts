import { InferSchemaType } from 'mongoose';
import { UserDocument, UserModel } from 'src/models/user.model';

export const createUser = async (input: InferSchemaType<UserDocument>) => {
  try {
    return await UserModel.create(input);
  } catch (ex: any) {
    throw new Error(ex);
  }
};
