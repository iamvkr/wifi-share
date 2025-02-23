import express from "express";
import cors from "cors"
import http from "http";
import { Server } from "socket.io";
import path from "path";

import hostRoutes from './routes/host.routes.js';
import clientRoutes from './routes/client.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { socketConnection } from "./io/socket.js";
import { rootDir } from "../utils/getDirName.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(rootDir, 'public')));

app.use('/', hostRoutes, express.static(path.join(rootDir, 'public')));
app.use('/client', clientRoutes);
// File upload route
app.use("/upload-file",uploadRoutes);
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(rootDir, 'public/uploads', filename);
  
    res.download(filePath, filename, (err) => { //Use res.download for simplicity.
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          res.status(500).send('Internal Server Error');
        }
      }
    });
  });

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

socketConnection(io);

export default server