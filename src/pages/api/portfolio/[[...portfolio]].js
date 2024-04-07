import getCollecction from "@/services/firebase/crud/getCollecction";
import getDocument from "@/services/firebase/crud/getDocument";
import { getFile } from "@/services/firebase/fileHandler";
import { skipTrailingSlashRedirect } from "../../../../next.config";

export default async function handler(req, res) {
    try {
        console.log(req.query.portfolio[0]);
        if(Object.keys(req.query).length === 0) {
            const { result: data } = await getCollecction("portfolio");

            await Promise.all(data.map(async (doc) => {
                doc.image = await getFile(doc.image);
            }));

            res.status(200).json(data);
        } else if (req.query.portfolio[0]) {
            const { result: portfolioItem } = await getDocument("portfolio", req.query.portfolio[0]);

            // Fetch icons for each skill
            if (portfolioItem.skill && portfolioItem.skill.length > 0) {
                const icons = await Promise.all(portfolioItem.skill.map(async (skillId) => {
                    console.log(skillId);
                    const { result: skillData } = await getDocument("skills", skillId.value);
                    return {icon:skillData.icon, name:skillData.name};
                }));
                portfolioItem.skill = icons;
            }
            portfolioItem.thumbnail = await getFile(portfolioItem.thumbnail);
            res.status(200).json(portfolioItem);
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, code: 500, error: error.message });
    }
}
