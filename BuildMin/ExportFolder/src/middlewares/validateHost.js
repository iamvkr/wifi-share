import fs from "fs";

export const validateHost = (req, res, next) => {
    /** check if host.json has host id */
    const text = fs.readFileSync("./host.json", { encoding: "utf8" })
    const { host } = JSON.parse(text);
    if (host) {
        // return res.sendFile(path.join(__dirname, 'public', 'index.html'));
        // return res.send("Host already Running!!") /** uncomment if want to block multiple host */
    }
    next();
}