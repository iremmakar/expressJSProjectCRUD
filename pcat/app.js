const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const ejs = require('ejs');

const fs = require('fs');

const methodOverride = require('method-override');

const mongoose = require('mongoose');

const photosController = require('./controllers/photoController');

const pageController = require('./controllers/pageController');

const Photo = require('./models/Photo');
mongoose.set('strictQuery', false);
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/index', photosController.getAllPhotos);

app.get('/photos/:id', photosController.getPhoto);

app.post('/photos', photosController.createPhoto);

app.put('/photos/:id', photosController.updatePhoto);

app.delete('/photos/:id', photosController.deletePhoto);

app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {});
