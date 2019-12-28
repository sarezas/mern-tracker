const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const exercisesRouter = require('./api-routes/exercise-routes');
const usersRouter = require('./api-routes/user-routes');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
});
connection.once('open', () => {
    console.log('MongoDB database connection established > successfully <');
});

app.listen(port, () => {
    console.log(`Server is running on port > ${port} <`);
});


