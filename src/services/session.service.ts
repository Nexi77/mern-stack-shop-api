import { FilterQuery } from 'mongoose';
import { SessionDocument, SessionModel } from 'src/models/session.model';

const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean();
};

export { createSession, findSessions };
