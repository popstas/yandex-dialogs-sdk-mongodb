import { ISessionStorage, ISession } from 'yandex-dialogs-sdk';
import { MongoClient, Db } from 'mongodb';
import { MongoDBSession } from './mongoDBSession';

export class MongoDBSessionStorage implements ISessionStorage {
  private db: Db;
  private url: string;
  private database: string;
  private user: string;
  private password: string;

  constructor(url: string, database: string, user: string, password: string) {
    this.url = url;
    this.database = name;
    this.user = user;
    this.password = password;
  }

  public connect() {
    return MongoClient.connect(
      this.url,
      {
        useNewUrlParser: true,
        auth: {
          user: this.user,
          password: this.password
        }
      }
    );
  }
  
  public async getOrCreate(id: string): Promise<ISession> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        try {
          const client = await this.connect();
          this.db = client.db(this.database);
          // console.log('mongo connected');
        } catch (err) {
          reject(err);
        }
      }

      try {
        const collectionName = 'users';
        let data = await this.db.collection(collectionName);
        if (data === null) {
          data = await this.db.createCollection(collectionName);
        }
        const sessionData = data.get('sessions').find({ id }) || {};

        const session = new MongoDBSession(sessionData);
        resolve(session);
      } catch (err) {
        reject(err);
      }
    });
  }
}
