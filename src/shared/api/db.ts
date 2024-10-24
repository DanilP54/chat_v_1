import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";

type DbCollections = string;

export class DbClient {
  private database = db;

  constructor(
    private collection: DbCollections,
    private converter: null,
  ) {
    this.collection = collection;
    this.converter = converter;
  }

  async getById(id: string) {
    const docRef = doc(this.database, this.collection, id);
    return await getDoc(docRef.withConverter(this.converter));
  }
}

export const dbClient = {
  create() {},

  async get(path: string, converter, id: string) {
    if (id) {
      const docRef = doc(db, path).withConverter(converter);
      return await getDoc(docRef);
    } else {
      const q = query(collection(db, path)).withConverter(converter);
      return await getDocs(q);
    }
  },
  save(id: string) {
    if(id) {
      return 1
    } else {
      return 2
    }
  },
  delete() {},
};

const profileDbClient = Object.create(dbClient);

profileDbClient.path = "users";
profileDbClient.converter = 'convert';

profileDbClient.getAll = async function() {
  const querySnapshot = await this.get(this.path, this.converter);
;

  profileDbClient.getById = async function (id: string) {
    const doc = await this.get(this.path, this.converter, id)
  }
