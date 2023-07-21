// dependencies
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { PORT } = process.env;
const morgan = require("morgan")

// routes
const authRoute = require("./Routes/AuthRoute");
const householdRoute = require("./Routes/HouseholdRoute");
const kidsRoute = require("./Routes/KidsRoute");
const bamsRoute = require("./Routes/BamsRoute");

// middleware
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);
app.use("/household", householdRoute);
app.use("/kids", kidsRoute);
app.use("/bams", bamsRoute);


app.get('/', (req, res) => {
  res.send('hello')
})

// listening
app.listen(PORT, () => {
  console.log(`🥔 Server is listening on port ${PORT}`);
});