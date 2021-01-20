const mongoose = require('mongoose');
const express = require('express');
const app = express();
const customers = require('./routes/customer');
const search = require('./routes/search')
const fakeData = require('./routes/faker');
var methodOverride = require('method-override')
// 1 : Connect to db
mongoose.connect('mongodb://localhost/itshareStore', { useNewUrlParser: true  , useUnifiedTopology: true})
    .then(() => console.log('Connected to DB Server ...'))
    .catch(err => console.log('Connection to DB Server Failed'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
app.set('view engine' , 'ejs')
app.use('/css', express.static(__dirname +'/node_modules/bootstrap/dist/css' ));
app.use('/public' , express.static(__dirname +'/public'));
app.use('/api/customer', customers);
app.use('/api/fake', fakeData);
app.use('/api/search', search);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));