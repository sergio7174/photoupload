const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const PhotoContoller = require('./controllers/PhotoControllers');
const PageContoller = require('./controllers/PageControllers');
const dotenv = require('dotenv');


const app = express();

dotenv.config();
// the database you’ll use also can be defined in an environmental variable
//mongoose.Promise = global.Promise;
// This line tells Mongoose to connect to the database defined in MONGODB_URI 
// or to default to your local recipe_db database location.

mongoose.connect("mongodb://0.0.0.0:27017/photo002_db")

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.get('/', PhotoContoller.getAllPhotos);
app.get('/photos/:id', PhotoContoller.getPhoto);
app.post('/photos', PhotoContoller.createPhoto);
app.put('/photos/:id', PhotoContoller.updatePhotos);
app.delete('/photos/:id', PhotoContoller.deletePhotos);

//pages
app.get('/about', PageContoller.aboutPage);
app.get('/add', PageContoller.addPage);
app.get('/photos/edit/:id', PageContoller.editPage);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda oluşturuldu.`);
});
