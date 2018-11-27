const express = require('express');
const server = express();
var responsestr1;
var responsestr2;
var responsestr3;
var humid;
var temperature;
var waterlevel;
var time;
var date;
var gate;

const Sensor = require('./Sensor');
server.get('/', (req, res) => {
  gate = req.query.gate;
  humid = req.query.humid;
  temperature=req.query.temperature;
  waterlevel=req.query.waterlevel;
  responsestr1 = `humid: ${humid}%`;
  responsestr2 = `temperature: ${temperature}C`;
  responsestr3 = `waterlevel: ${waterlevel}`;
  time=new Date().toLocaleTimeString();
  date=new Date().toLocaleDateString();
  const sensorData = new Sensor({
    humid: humid,
    temperature: temperature,
    waterlevel: waterlevel,
    time:time,
    date:date
  });
  sensorData
    .save()
    .then(result=>{
      console.log("saved");
    })
    .catch(error=>{
      console.log("failed to save");
    });

  res.status(200).send(JSON.stringify(responsestr1+" "+responsestr2+" "+responsestr3));
  console.log(responsestr1);
  console.log(responsestr2);
  console.log(responsestr3);

});
server.get('/history', (req, res) => {
  Sensor.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});

server.get('/gate', (req, res) => {
    res.status(200).send(gate);
});

server.get('/humid', (req, res) => {
  res.status(200).json(humid);
});
server.get('/temperature', (req, res) => {
  res.status(200).json(temperature);
});
server.get('/waterlevel', (req, res) => {
  res.status(200).json(waterlevel);
});
server.get('/time', (req, res) => {
  res.status(200).json(time);
});
server.get('/date', (req, res) => {
  res.status(200).json(date);
});
server.get('/deleteall', (req, res) => {
  Sensor.deleteMany({})
  .then((response)=>{
    res.status(200).send(response);
  })
  .catch((error)=>{
    res.status(400).send(error);
  })
});


server.listen(5000, () => {
  console.log('server started on port 5000');
});
