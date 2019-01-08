import { MongoDBSessionStorage } from './mongoDBSessionStorage';
import { sessionMiddleware } from 'yandex-dialogs-sdk';

export function middleware(url: string, database: string, user: string, password: string) {
  const storage = new MongoDBSessionStorage(path);
  return sessionMiddleware(storage);
}
