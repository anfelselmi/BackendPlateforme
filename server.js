const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const path = require('path');
const cors = require('cors');
const db = require('./config/database');
var cookieParser = require('cookie-parser');
// parse application/json
app.use(cookieParser());
app.use(bodyParser.json());
// to read body from request
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

const Admin = require('./routes/adminRoute');
const User = require('./routes/userRoute');
const Candidate = require('./routes/candidateRoute');
const Job = require('./routes/jobRoute');
const Candidacy = require('./routes/candidacyRoute');
const Company = require('./routes/companyRoute');

app.use('/admin', Admin);
app.use('/candidate', Candidate);
app.use('/job', Job);
app.use('/candidacy', Candidacy);
app.use('/company', Company);
app.use('/user', User);

app.get('/file/:cv', function (req, res) {
  res.sendFile(__dirname + '/upload/' + req.params.cv);
});

app.get('/file/:avatar', function (req, res) {
  res.sendFile(__dirname + '/upload/' + req.params.avatar);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: ' Path Not found' });
  else res.status(500).json({ message: 'Something looks wrong ' + err });
});

app.listen(port, () => {
  try {
    console.log(`Success http://localhost:${port}`);
  } catch (error) {
    console.log(`Error connection`);
  }
});
