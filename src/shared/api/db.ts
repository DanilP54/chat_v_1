import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  FirestoreDataConverter,
  DocumentData,
  setDoc,
  DocumentSnapshot,
} from "firebase/firestore";

import { db } from "../config/firebase";

type UserId = string;
type Path = string;


export const COLLECTIONS = {
  USERS: 'users',
}

export class DbClient<T, E extends DocumentData> {
  


  constructor(private readonly mapper: FirestoreDataConverter<T, E>) {}

  async findById(path: Path, id: UserId, onNext?: (entity: DocumentSnapshot<T, E>) => void) {
    const docRef = doc(db, path, id).withConverter(this.mapper);    
    return await getDoc(docRef);
  }

  async findMany(path: Path) {
    const q = query(collection(db, path)).withConverter(this.mapper);
    return await getDocs(q);
  }

  async create(path: Path, data: T, id: UserId) {
    const docRef = doc(db, path, id).withConverter(this.mapper);
    await setDoc(docRef, data);
  }

  async update(path: Path, data: T, id: UserId) {
    const docRef = doc(db, path, id).withConverter(this.mapper);
    await setDoc(docRef, data);
  }
}

