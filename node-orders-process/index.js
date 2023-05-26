const express = require('express')
const fs = require('fs');
const amqp = require("amqplib");

const app = express()
const port = 5001
var globalVar = 0

async function connect() {
 try {
  // const connection = await amqp.connect("amqp://guest:guest@10.1.0.156:5672"); // uncomment if u want to connect using endpoints internally from one microservice to another
  const connection = await amqp.connect("amqp://guest:guest@rabbitmq-srv:5672");

  const channel = await connection.createChannel();
   await channel.assertQueue("order-processing");
    channel.consume("order-processing", message => {
     const input = JSON.parse(message.content.toString());
     console.log(`Received number: ${input.orderNumber}`);
     channel.ack(message);
   });
   console.log(`Waiting for messages...`);
 } catch (ex) {
   console.error(ex);
 }
}
connect();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

