import getCollecction from "@/services/firebase/crud/getCollecction";
import getDocument from "@/services/firebase/crud/getDocument";

export default async function handler(req, res) {
    console.log(req.query.skill);

    try {
        if (req.query.skill[1]) {
            const { result: data } = await getDocument("skills", req.query.skill[1]);
            res.status(200).json(data);
        } else {
            const { result: data } = await getCollecction("skills");
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, code: 500, error: error.message });
    }

}
