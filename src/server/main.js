/** https://www.npmjs.com/package/vite-express */
import { getLocalIpv4 } from "./utils/getLocalIpv4.js";
import { cleanUp } from "./utils/cleanUp.js";
import { openInEdge } from "./utils/openInEdge.js";
import ViteExpress from "vite-express";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketConnection } from "./io/socket.js";
import cors from "cors"

import uploadRoutes from './routes/upload.routes.js';
import downloadRoutes from './routes/download.routes.js';

const PORT = 53314;
const localIp = getLocalIpv4();


const app = express();
const socketServer = http.createServer(app);

app.use(cors());
app.use(express.json());

const server = socketServer.listen(PORT, localIp, () => {
    if (localIp === "127.0.0.1") {
        console.log("Couldn't connect to Wifi! Try Again");
    } else {
        console.log(`server is listnig at http://${localIp}:${PORT}`);
        console.log("Initializing app... Please wait...");
        setTimeout(() => {
            openInEdge(localIp, PORT);
        }, 2000);
    }
    cleanUp();
}
);

const io = new Server(server, {
    cors: { origin: "*" }
});
socketConnection(io);

// File upload route
app.use("/upload-file", uploadRoutes);
app.use("/download/", downloadRoutes);

// ViteExpress.config({ mode: "production" }) /** uncomment when test for production */
ViteExpress.bind(app, server);