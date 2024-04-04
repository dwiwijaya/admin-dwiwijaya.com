import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function addDocument(colllection, id, data) {
    let result = null;
    let error = null;
    data.timestamp = Date.now();

    try {
        await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
        result = true;
    } catch (e) {
        error = e;
    }

    return { result, error };
}