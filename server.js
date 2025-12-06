const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: { origin: "*" }
});

// Khi user vào kết nối
io.on("connection", (socket) => {
    console.log("A user connected");

    // Nhận dữ liệu vẽ và gửi cho người khác trong phòng
    socket.on("canvas-data", (data) => {
        socket.broadcast.emit("canvas-data", data); // send to all except sender
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// PORT do Render cấp, không được dùng 5000 cố định
const PORT = process.env.PORT || 10000;

http.listen(PORT, () => {
    console.log("Socket server running on port: " + PORT);
});
