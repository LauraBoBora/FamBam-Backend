// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

// mongoose
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

// listening
app.listen(PORT, () => {
  console.log(`🥔 Server is listening on port ${PORT}`);
});

// middleware
app.use(
    // cross origin resource sharing
    cors({
      origin: ["http://localhost:4000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(cookieParser());
  
  app.use(express.json());

  app.use("/", authRoute);