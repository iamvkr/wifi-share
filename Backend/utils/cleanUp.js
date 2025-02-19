import { rootDir } from "./getDirName.js";
import fs from "fs";
import path from "path";

export const cleanUp = () => {
    const directory = path.normalize(rootDir + "/public/uploads");
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
                console.log("Temp files cleaned");
            });
        }
    });
}