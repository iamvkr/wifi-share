import server from "./src/app.js"
import open, { apps } from "open";
import { getLocalIpv4 } from "./utils/getLocalIpv4.js";
import { cleanUp } from "./utils/cleanUp.js";
import { openInEdge } from "./utils/openInEdge.js";

const PORT = 53314;
const localIp = getLocalIpv4();

server.listen(PORT, localIp, async () => {
    console.log(`server is listnig at http://${localIp}:${PORT}`);
    if (localIp === "127.0.0.1") {
        console.clear();
        console.log("Cannot connect to Wifi - Try Again");
    } else {
        /** open */
        // await open(`http://${localIp}:${PORT}`, {app: [{name: apps.edge}]});
        openInEdge(localIp,PORT);
    }
    /** check for temporary uploaded files if exist, clean up */
    cleanUp();
})