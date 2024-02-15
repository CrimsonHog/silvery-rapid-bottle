// fix this
require('dotenv').config();
// ^^^^^^^^^
const express = require('express')
const app = express()
const port = process.env.PORT || 5500;

const { MongoClient, ServerApiVersion } = require('mongodb');

// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const db = client.db("papaLab");
    const coll = db.collection("papaCollection");

    const docs = [
      {name: "Ethan Rinke", schoolClass: "Student", studentYear: "Senior", gradMonth: "May"},
      {name: "Dallas Hine", schoolClass: "Grad", studentYear: "Grad", gradMonth: "May"}
    ];
    const result = await coll.insertMany(docs);
    // display the results of your operation
    console.log(result.insertedIds);


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get('/', function(req, res){

});

app.get('/send', function(req, res){

});


// use res.render to load up an ejs view file

let myTypeServer = "Type 5 -- Investigator";

app.get('/', function(req, res) {

  res.render('index', {
   
    myTypeClient: myTypeServer 

  });
  
});




app.get('/send', function (req, res) {
  
    res.send('Hello World from Express <br><a href="/">home</a>')
})

// app.listen(3000)

app.listen(port, () => {
  console.log(`papa app listening on port ${port}`)
})