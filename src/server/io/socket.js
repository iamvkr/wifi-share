/** handles all socket connection events */
import fs from "fs";

export const socketConnection = (io)=>{
    io.on("connection", (socket) => {
        console.log("A user connected");
    
        socket.on("sendMessage", (data) => {
            io.emit("receiveMessage", data)
        })

        socket.on("sendFile", (data) => {
            io.emit("receiveFile", data)
        })
    
        socket.on("disconnect", () => {
            fs.writeFileSync("./host.json", JSON.stringify({ host: "" }), { encoding: "utf8" })
            console.log("User disconneted");
            io.emit("user disconneted")
        })
    })
}