import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function updateDocument(collectionName, id, newData) {
    let result = [];
    let error = null;
    newData.timestamp = Date.now();
    try {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, newData, { merge: true });
        result = true
    } catch (e) {
        error = e;
    }
    
    return { result, error };

}