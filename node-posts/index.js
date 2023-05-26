const express = require('express')
const fs = require('fs');
const path = require('path');

const amqp = require("amqplib");

const app = express()
const port = 4000
var globalVar = 0

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
app.get('/posts/fetch', (req, res) => {
  console.log("before respond======", globalVar, req.query.reset);
  const filePath = path.join(__dirname, 'story', 'abcdshubham.txt');
  console.log("filePath======", filePath);
  try{
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("data======", data);

  }
  catch(err){
    console.log("got error while reading==", err);
  }
  res.status(201).json({ message: 'Text was fetched!' });


  // if(req.query.reset) globalVar = 0;
  // ++globalVar
  // // const file = fs.createWriteStream("./big.file");

  // // file.end();
  // console.log("ready to send response======", globalVar);

  // res.send('Hello World This is Post Microservice!!!!!???>>>>')
})

app.get('/posts', (req, res) => {
  console.log("before respond======", globalVar, req.query.reset);
  const filePath = path.join(__dirname, 'story', 'abcdshubham.txt');
  console.log("filePath======", filePath);


  fs.appendFile(filePath, "aaaa" + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });

  fs.appendFile(filePath, "aaaa" + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });


  // if(req.query.reset) globalVar = 0;
  // ++globalVar
  // // const file = fs.createWriteStream("./big.file");

  // // file.end();
  // console.log("ready to send response======", globalVar);

  // res.send('Hello World This is Post Microservice!!!!!???>>>>')
})


app.get('/order', async(req, res) => {
  const msgBuffer = Buffer.from(JSON.stringify({ orderNumber: 1 }));
  try {
    console.log("Sending message to order-processing queue====");

    // const connection = await amqp.connect("amqp://guest:guest@localhost:32196");
    // const connection = await amqp.connect("amqp://guest:guest@10.1.0.156:5672");
    const connection = await amqp.connect("amqp://guest:guest@rabbitmq-srv:5672");

    const channel = await connection.createChannel();
    await channel.assertQueue("order-processing");
    await channel.sendToQueue("order-processing", msgBuffer);
    console.log("Sending message to order-processing queue");
    await channel.close();
    await connection.close();
  
  } catch (err) {
    console.log("error in order======", err);
  }
  res.send('Hello World This is Post Microservice!!!!!???>>>>')
})


// process.on('SIGKILL', ()=>{
  // console.log("ready to kill process======");

// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

