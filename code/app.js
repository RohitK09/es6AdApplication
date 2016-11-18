import express from "express";
import http from 'http';
//import routes from 'routes';
import adservice from './services/adservice'
import winston from 'winston';
import bodyparser from 'body-parser';
winston.level = 'debug';
const log = winston;


let app = express();
/***
 * 
 */
app.use(bodyparser.json());
app.use('/api/getAdvertisement/:typeOfAdvert?', function (req, res) {
  let typeOfAdvert = req.params.typeOfAdvert;
  adservice.getAdvertisement(typeOfAdvert).then(function(htmlData){
    res.send(htmlData);
  }).catch(function(err){
    //sending empty response 
    log.error("Error at getAdvertisement ",JSON.stringify(err));
    res.send("");
  });

});

app.post('/api/saveAdvertisement', function (req, res) {

  adservice.saveAdvertisement(req.body).then(function (resData) {
    res.send("Data Inserted Successfuly");
  },function(err){
     log.error("Caught Error ,while saving the Advert");
     res.send('Not Saved Please check ur input Data');
  }).catch(function(err){
     res.send('Not Saved Please check ur input Data');
     log.error("Caught Error ,while saving the Advert");
     
  })

})

app.server = http.createServer(app);
app.server.listen(3000);
