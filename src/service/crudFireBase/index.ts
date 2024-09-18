import { db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  DocumentData,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const firebaseService = {
  async create<T extends DocumentData>(
    collectionName: string,
    data: T
  ): Promise<string> {
    const collectionRef = collection(db, collectionName);

    const docRef = await addDoc(collectionRef, data);
    console.log("collectionRef", docRef);
    return docRef.id;
  },

  async update<T extends DocumentData>(
    collectionName: string,
    id: string,
    data: T
  ): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  },
  async upLoad(File: File, collectionName: string): Promise<string> {
    const storage = getStorage();
    const imageRef = ref(storage, `${collectionName}/${File.name}`);

    await uploadBytes(imageRef, File);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  },

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  },
  async remove(collectionName: string, id: string): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },
  async getData<T>(collectionName: string): Promise<T[]> {
    const Collection = collection(db, collectionName);
    const Snapshot = await getDocs(Collection);
    const list = Snapshot.docs.map((doc) => {
      const data = doc.data() as T;
      return {
        key: doc.id,
        ...data,
      } as T;
    });
    return list;
  },
};
