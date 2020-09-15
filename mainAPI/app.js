var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const nconf = require('nconf');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/EditContractRoute');


var app = express();

//server configuration
var prod = true
var basePath = '/api';
var port = 6200;
let uri = ''
if (prod) {
  

  mongoose.connect('mongodb://user@localhost:27017/lawyercontracts', {useNewUrlParser: false})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  // if (nconf.get('mongoDatabase')) {
  //   uri = `${uri}/${nconf.get('mongoDatabase')}`;
  // }

} else {
  uri = 'mongodb://mongodb'
}

app.use(cors());

// Connection to DB

// App Instance
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(basePath, routes);







app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  console.log('InterviewRoutes Backend running on Port: ', port);
});