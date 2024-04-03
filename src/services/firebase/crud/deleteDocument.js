import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function deleteDocument(collectionName, id) {
    let result = [];
    let error = null;

    try {
        const docRef = doc(db, collectionName, id);
        result = await deleteDoc(docRef);
    } catch (e) {
        error = e;
    }
    return { result, error };
}