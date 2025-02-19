/** handles all socket connection events */
import fs from "fs";
import path from "path";

export const socketConnection = (io)=>{
    io.on("connection", (socket) => {
        // socket.id = Math.floor(Math.random() * 1000);
        console.log("connected");
        // console.log("connected::", socket.id);
        /** check if host.json has host id */
        const text = fs.readFileSync("./host.json", { encoding: "utf8" })
        const { host } = JSON.parse(text);
        if (!host) {
            fs.writeFileSync("./host.json", JSON.stringify({ host: socket.id }), { encoding: "utf8" })
        }
    
        socket.on("sendMessage", (data) => {
            io.emit("receiveMessage", data)
        })
    
        socket.on("disconnect", () => {
            fs.writeFileSync("./host.json", JSON.stringify({ host: "" }), { encoding: "utf8" })
            console.log("User disconneted");
            // console.log("User disconneted:: ", socket.id);
            io.emit("user disconneted")
        })
    })
}