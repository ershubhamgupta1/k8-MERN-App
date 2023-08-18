const express = require('express')
const fs = require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');
const amqp = require("amqplib");
const { Client } = require("@elastic/elasticsearch");

const app = express()
const port = 4000
var globalVar = 0
// Create Instance of MongoClient for mongodb
const client = new MongoClient('mongodb://mongo-nodeport-svc:27017')

// Connect to database
app.get('/posts/create-posts', async(req, response)=> {
  try{
    const res = await client.db('mydb').collection('posts').insertOne({ name: '2nd post', user: 'Amyport@example.com'})
    console.log("res======>>", res);
    response.status(201).json({ message: 'Posts Created Done!!!!' });
  }
  catch(err){
    response.status(500).json({ message: 'Internal server error!' });
  }
})

app.get('/posts/get-posts', async(req, response)=> {
  try{
    const res = await client.db('mydb').collection('posts').findOne({name: '2nd post'})
    console.log("posts======>>>>>>", res);
    response.status(201).json({ message: 'Posts fetched!' });
  }
  catch(err){
    response.status(500).json({ message: 'Internal server error!' });
  }
})



app.get('/posts/order', async(req, res) => {
  const msgBuffer = Buffer.from(JSON.stringify({ orderNumber: 1 }));
  try {
    // const connection = await amqp.connect("amqp://guest:guest@localhost:32196");
    // const connection = await amqp.connect("amqp://guest:guest@10.1.0.156:5672");
    const connection = await amqp.connect("amqp://guest:guest@rabbitmq-srv:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("order-processing");
    await channel.sendToQueue("order-processing", msgBuffer);
    await channel.close();
    await connection.close();
    res.status(201).json({ message: 'order request has requested!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
})

// app.get('/posts/check-elastic-search', async(req, res) => {
//   console.log(' process.env.elasticsearch_certificate=======>>',  process.env.elasticsearch_certificate);
//   try {
//     // const client = new Client({ 
//     //   node: "https://elasticsearch-sample-es-http.default.svc.cluster.local:9200",
//     //   auth: {
//     //     username: 'elastic',
//     //     password: process.env.elasticsearch_password
//     //   },
//     //   ssl: {
//     //     ca: process.env.elasticsearch_certificate,
//     //     rejectUnauthorized: false,
//     //   },    
//     // });
//     const client = new Client({
//       node: "https://elasticsearch-sample-es-http.default.svc.cluster.local:9200", // http://elasticsearch-es-http.default.svc.cluster.local:9200
//     });
//     async function health() {
//       let connected = false;
//       while (!connected) {
//         console.log("Connecting to Elasticsearch>>>>>");
//         try {
//           const health = await client.cluster.health({});
//           connected = true;
//           console.log(health.body);
//           return health;
//         } catch (err) {
//           console.log("ES Connection Failed", err);
//         }
//       }
//     }
//     health();
//     res.status(201).json({ message: 'order request has requested!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Internal server error!' });
//   }
// })



app.listen(port, async () => {
  console.log(`posts app listening on port>>> ${port}`)
  try{
    await client.connect();
    console.log('Connected Successfully')
  }
  catch(err){
    console.log('Failed to connect', err)
  }
})



app.get('/posts/host-machine', (req, res) => {
  console.log("before respond======>>", globalVar, req.query.reset);
  const filePath = path.join(__dirname, 'abc');
  console.log("filePath======", filePath);
  try{
    const data = fs.writeFileSync(filePath, 'Dddd');
  res.status(201).json({ message: "got response of live changes withut restarting docker pod>>" });

  }
  catch(err){
    console.log("got error while saving on host machine==", err);
    res.status(201).json({ message: 'Text was stored in host machine!' });
    
  }
})
// app.get('/posts/fetch', (req, res) => {
//   console.log("before respond======", globalVar, req.query.reset);
//   const filePath = path.join(__dirname, 'story', 'abcdshubham.txt');
//   console.log("filePath======", filePath);
//   try{
//     const data = fs.readFileSync(filePath, 'utf8');
//     console.log("data======", data);

//   }
//   catch(err){
//     console.log("got error while reading==", err);
//   }
//   res.status(201).json({ message: 'Text was fetched!' });


//   // if(req.query.reset) globalVar = 0;
//   // ++globalVar
//   // // const file = fs.createWriteStream("./big.file");

//   // // file.end();
//   // console.log("ready to send response======", globalVar);

//   // res.send('Hello World This is Post Microservice!!!!!???>>>>')
// })

// app.get('/posts', (req, res) => {
//   console.log("before respond======", globalVar, req.query.reset);
//   const filePath = path.join(__dirname, 'story', 'abcdshubham.txt');
//   console.log("filePath======", filePath);


//   fs.appendFile(filePath, "aaaa" + '\n', (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Storing the text failed.' });
//     }
//     res.status(201).json({ message: 'Text was stored!' });
//   });

//   fs.appendFile(filePath, "aaaa" + '\n', (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Storing the text failed.' });
//     }
//     res.status(201).json({ message: 'Text was stored!' });
//   });
// })
