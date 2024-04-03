import firebase_app from "../config";
import { getFirestore, getDocs,collection } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getCollecction(collectionName,) {
    let docRef = collection(db, collectionName);

    let result = [];
    let error = null;

    try {
        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}