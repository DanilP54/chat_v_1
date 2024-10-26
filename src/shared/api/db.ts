import { collection, doc, getDoc, getDocs, query, FirestoreDataConverter, DocumentData } from "firebase/firestore";
import { db } from "../config/firebase";



type UserId = string
type Path = string

export abstract class DbClient {

  constructor(){}

  protected async get<T, E extends DocumentData>(path: Path, converter: FirestoreDataConverter<T, E>, id?: UserId) {
    if (id) {
      const docRef = doc(db, path).withConverter(converter);
      return await getDoc(docRef);
    } else {
      const q = query(collection(db, path)).withConverter(converter);
      return await getDocs(q);
    }
  }
}
