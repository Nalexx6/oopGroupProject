const express = require('express');
const mongoose = require('mongoose');

const projectRoutes = require('./routes/project-routes');
const usersRoutes = require('./routes/users-routes');
const reviewRoutes = require('./routes/review-routes');
const cors = require('cors')

const HttpError = require('./models/http-error');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()) // Use this after the variable declaration
app.use('/api/projects', projectRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reviews', reviewRoutes)



app.use((req, res, next) => {
    next(new HttpError('Could not find this route'), 404)
});

mongoose
    .connect('mongodb+srv://zolottareva:pidarpidaras@cluster0.dtktk.mongodb.net/core_tool?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });

// fetch("https://localhost:5000/api/projects/vcghsajdyhsjacuw")
// .method("GET")