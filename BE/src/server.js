const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = 4200;

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const allowedOrigins = ["http://localhost:3000", "https://accounts.google.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

dotenv.config();

const apiAdminRoutes = require("./routes/admin");
app.use("/api", apiAdminRoutes);

const apiClientRoutes = require("./routes/client");
app.use("/api", apiClientRoutes);

const apiAuthRoutes = require("./routes/auth");
app.use("/api", apiAuthRoutes);

const apiGoogleRoutes = require("./routes/authGoogle");
app.use("/api/auth", apiGoogleRoutes);

io.on("connection", (socket) => {

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {

  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
