const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ParseServer = require('parse-server').ParseServer;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const parseServerOptions = {
  databaseURI: 'mongodb://localhost:27017/my-database',
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  serverURL: 'http://localhost:1337/parse',
  allowClientClassCreation: false,
  allowExpiredAuthDataToken: false,
  encodeParseObjectInCloudFunction: true,
};

const api = new ParseServer(parseServerOptions);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

let appData = {"login":false, "appName": "Application"};

app.get('/', (req, res) => {
  const dynamicValue = 'This is a dynamic value from the server';
  const number = 1;
  res.render('template', { dynamicValue, number, appData });
});

app.get('/register', (req, res) => {
  res.render('auth/register', {appData});
});

app.post('/registration', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    res.render('registration', { email, password, appData });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
