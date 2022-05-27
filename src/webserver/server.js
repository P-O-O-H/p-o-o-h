/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Tarren Meyers
 * Email: meyersta@oregonstate.edu
 */

var path = require('path');
var express = require('express');
const fs = require('fs');
var expresshandle = require('express-handlebars');
var potData = require('./potData');
var logData = require('./logData');


var modal = true;
var delmodal = true;


var app = express();
var port = process.env.PORT || 3001;
app.engine('handlebars', expresshandle({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).render('potPage',{allPots: potData,boolean:modal,boolean:delmodal});
});

app.post('/addpot',urlencodedParser , function (req, res) {
  response = {
    hostname: req.body.pot_host_input,
    port: req.body.pot_port_input,
    img:  req.body.pot_img_input
  }


  HONEYPOT_NAME = response.hostname;
  HONEYPOT_PORT = response.port;
  HONEYPOT_IMAGE = response.img;
  fileName = "yamls/" + HONEYPOT_NAME + ".yaml";
  content = `---
# HONEYPOT_NAME service definition.
apiVersion: v1
kind: Service
metadata:
  name: ${HONEYPOT_NAME}
  namespace: pots
  labels:
    app: ${HONEYPOT_NAME}
spec:
  type: LoadBalancer
  ports:
    - port: ${HONEYPOT_PORT}
  selector:
    app: ${HONEYPOT_NAME}

---
# HONEYPOT_NAME application definition.
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${HONEYPOT_NAME}
  namespace: pots
  labels:
    app: ${HONEYPOT_NAME}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${HONEYPOT_NAME}
  template:
    metadata:
      labels:
        app: ${HONEYPOT_NAME}
    spec:
      containers:
        - name: ${HONEYPOT_NAME}
          image: ${HONEYPOT_IMAGE}
          resources:
            limits:
              cpu: 1000m
            requests:
              cpu: 100m`;

  fs.writeFile(fileName, content, err => {
    if (err) {
      console.log(err);
      return;
    }
  });


  var data = fs.readFileSync('potData.json');
  var json = JSON.parse(data);
  json.push(response);

  potData = json;

  fs.writeFile("potData.json", JSON.stringify(json), err => {
    if (err) {
      console.log(err);
      return;
    }
  });

  res.redirect("/pot");

});


app.post('/delpot',urlencodedParser , function (req, res) {
  response = {
    hostname: req.body.pot_host_delete_input
  }

  fileName = "yamls/" + response.hostname + ".yaml";

  var data = fs.readFileSync('potData.json');
  var json = JSON.parse(data);


  output = json.filter(function(item) {
     return item.hostname !== response.hostname;
  });

  potData = output;

  fs.writeFile("potData.json", JSON.stringify(output), err => {
    if (err) {
      console.log(err);
      return;
    }
  });

  fs.unlink(fileName, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });


  res.redirect("/pot");
});

app.get('/pot', function (req, res) {
  res.status(200).render('potPage',{allPots: potData,boolean:modal});
});
app.get('/log', function (req, res) {
  res.status(200).render('logPage',{allLogs: logData});
});


app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
