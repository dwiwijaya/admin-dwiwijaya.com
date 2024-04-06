import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocument(collectionName, id) {
    let result = [];
    let error = null;
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            result = { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Document not found");
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}
