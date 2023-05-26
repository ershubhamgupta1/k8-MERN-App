const express = require('express')

const app = express()
const port = 5000
var globalVar = 0

app.get('/login', (req, res) => {
  console.log("before respond======", globalVar, req.query.reset);

  if(req.query.reset) globalVar = 0;
  ++globalVar

  for (let i = 0; i < 10000000000; i++) {
  }

  console.log("ready to send response======", globalVar);
  res.send('Hello World This is login auth Microservice!!')
})

app.get('/heap-out-of-memory', (req, res)=>{
  let arr = Array(1e8).fill("some string"); //1e6 equals to 1 Million record and 1e8 equals to 100 Million records
  arr.reverse();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${used} MB`);
  res.send('Not out of memory!!')
})

app.get('/stack-overflow', (req, res)=>{
  let i=0;
  function inception(){
    if(i === 10567) return;
    i++;
    inception()
  }
  inception()
  res.send('No Stack Overflow!!')

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

