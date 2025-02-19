import { rootDir } from "../../utils/getDirName.js";
import path from "path";

export const ClientController = async (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'index.html'));
}