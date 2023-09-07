var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var multer = require('multer');
const { ObjectId } = require('mongodb');
const fs = require('fs')

var app = Express();
app.use(cors());

var CONNECTION_STRING = fs.readFileSync("../../MongoDb Connection.txt").toString();

var DATABASENAME="Games"
var database;

app.listen(5038,()=>{
  MongoClient.connect(CONNECTION_STRING,(error,client)=>{
    database = client.db(DATABASENAME);
    console.log('MONGODB CONNECTED');
  });
})

app.get('/getGames', (request,response)=> {
  database.collection('Game').find({}).toArray((error, result)=>{
    response.send(result);
  })
})

app.get('/getGames/:id', (request,response)=> {
  var id = request.params.id;
  database.collection('Game').find(ObjectId(id)).toArray((error, result)=>{
    response.send(result);
  })
})

app.get('/getReviews/:id', (request,response)=> {
  var id = request.params.id
  database.collection('GameReview').find({"gameId": id}).toArray((error, result)=>{
    response.send(result);
  })
})

app.post("/newReview", multer().none(), (request, response) => {
  database.collection("GameReview").count({},function(){
    database.collection("GameReview").insertOne({
      gameId: request.body.gameId,
      comment: request.body.comment,
      timeStamp: new Date().toISOString()
    });
    response.json("Added Succesfully")
  })
})

app.delete("/deleteReview/:id", (request, response)=> {
  database.collection("GameReview").deleteOne({
    _id: ObjectId(request.params.id)
  });
  response.json("Deleted Succesfully");
})

app.put("/updateReview/:id", multer().none(), (request, response) => {
  database.collection("GameReview").count({},function(){
    database.collection("GameReview").updateOne({
      _id: ObjectId(request.params.id),
    },
    {
      $set:{comment:request.body.comment}
    });
    response.json("Updated Succesfully")
  })
})