var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');

app.set('views', './views');

mongoose.connect('mongodb://0.0.0.0:27017/mymusic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:',error);
});

const userSchema = new mongoose.Schema({
  name: String,
  artista: String,
  genero: String,
  comentario: String
});

const Music = mongoose.model('Music', userSchema);

app.get('/', (req, res) => {
  res.render('form.ejs');
});

app.post('/save-form-music', (req, res) => {
  const datos = req.body;
  const newMusic = new Music({
    name: datos.nombre,
    artista: datos.artista,
    genero: datos.genero,
    comentario: datos.comentario
  });
  
  newMusic.save().then(() => {
    console.log('New music created!');
  }).catch((error) => {
    console.error('Error creating user:', error);
  });

  res.render('form.ejs')
});

app.get('/table-user', (req, res) => {
  Music.find().then((registermusic) => {
    console.log('All music:', registermusic);
    res.render('table.ejs',{'table':registermusic});
  }).catch((error) => {
    console.error('Error retrieving users:', error);
  });
});



app.listen(3000, () => {
  console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});
