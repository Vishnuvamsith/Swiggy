const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const auth=require('./routes/authentication')
const profile=require('./routes/profile')
const feedback=require('./routes/feedback')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));
app.use('/auth',auth)
app.use('/profile',profile)
app.use('/feedback',feedback)

app.listen(5001, () => console.log('Server running on port 5001'));
