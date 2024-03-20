const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectToMongoDb = require('./utils/connectToMongoDb.js');
const authRouter = require('./routes/auth.routes.js');
const messageRouter = require('./routes/message.routes.js');
const userRouter = require('./routes/user.routes.js');
const {app, server} = require('./socket/socket.js')

dotenv.config();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN,
}));
app.use(cookieParser());

// routes
app.use('/api/auth/', authRouter);
app.use('/api/messages/', messageRouter);
app.use('/api/users/', userRouter);

// connection
server.listen(PORT, () => {
    connectToMongoDb();
    console.log('Server Started at port ' + PORT);
})

// TODO: WebSocket goes here