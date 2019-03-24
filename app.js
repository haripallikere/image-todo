const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary/lib/cloudinary');


cloudinary.config({ 
  cloud_name: 'dj3lpnm5p', 
  api_key: '843281916635171', 
  api_secret: 'uvs892d9LHXrZEDy1-sPwlEXSUk' 
});

// connect to the mongodb
mongoose.connect("mongodb://localhost:27017/img-test",{ useNewUrlParser: true },
  err => {
    if (err) console.log(err, "connection lost");
    console.log("connected");
  }
);

const imageSchema = new mongoose.Schema({
  url: {type: String},
  createdAt: {type: Date, default: new Date()}
})

const Image = mongoose.model('Image', imageSchema)

app.use(express.static(path.join(__dirname, "dist")));

app.use(bodyParser.json({
  limit: '10mb', extended: true
}))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "./server/views"));

app.get('/', (req, res) =>{
  res.render("index")
})

app.post('/api/image', (req, res) => {
  const { imgUrl, fileName } = req.body;

  cloudinary.v2.uploader.upload(imgUrl, {
    public_id: fileName,
    resource_type: "image"
  }, (err, image) => {
    const newImage = new Image({
      url : image.secure_url
    })

    newImage.save((err, currentSaved) => {
      res.json({
        url: currentSaved.url
      })
    })
  })
})

app.listen(8000);