import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getFile } from "../fileHandler";

const db = getFirestore(firebase_app);

export default async function getDocument(collectionName, id, useFile = false, fileField = null) {
    let result = [];
    let error = null;
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            result = { id: docSnap.id, ...docSnap.data() };
            if (useFile) {
                result[fileField] = await getFile(result[fileField])
            }
        } else {
            throw new Error("Document not found");
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}
