import getCollecction from "@/services/firebase/crud/getCollecction";

export default async function handler(req, res) {
    const { result } = await getCollecction("skills")
    res.status(200).json(result);
}