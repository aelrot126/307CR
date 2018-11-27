const mongoose = require('mongoose');

const db= 'mongodb://jadennodemcu:mlab123@ds137003.mlab.com:37003/jadennodemcu';

mongoose
.connect(db, {useNewUrlParser:true})
.then(()=>{
  console.log('Connected to mongodb');
})
.catch((error)=>{
  console.log('Connection error:',error);
});
const sensorSchema = new mongoose.Schema({
  humid:{
    type:Number
  },
  temperature:{
    type:Number
  },
  waterlevel:{
    type:Number
  },
  time:{
    type:String
  },
  date:{
    type:String
  }

});
const Sensor = mongoose.model('Sensor',sensorSchema, 'sensorCollection');
module.exports =Sensor;
