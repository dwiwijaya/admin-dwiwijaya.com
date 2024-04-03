import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function updateDocument(collectionName, id, newData) {
    let result = [];
    let error = null;

    try {
        const docRef = doc(db, collectionName, id);
        result = await setDoc(docRef, newData, { merge: true });
    } catch (e) {
        error = e;
    }
    
    return { result, error };

}