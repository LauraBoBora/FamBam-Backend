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
// const bamRouter = require('./Controllers/bam');

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
// app.use("/bams", bamRouter);

app.get('/', (req, res) => {
  res.send('hello')
})

// listening
app.listen(PORT, () => {
  console.log(`🥔 Server is listening on port ${PORT}`);
});

// require('dotenv').config()
// const { PORT, MONGODB_URL } = process.env;
// const express = require('express')
// const cors = require('cors')
// const morgan = require('morgan')
// const app = express()
// const boardRouter = require('./controllers/board')
// const cardRouter = require('./controllers/card')
// const taskRouter = require('./controllers/task')

//middleware
// app.use(cors())
// app.use(morgan('dev'))
// app.use(express.json())
// app.use('/boards', boardRouter);
// app.use('/boards/:boardId/cards', cardRouter);
// app.use('/boards/:boardId/cards/:cardId/tasks', taskRouter);


// app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))