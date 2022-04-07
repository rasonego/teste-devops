//create a simple express app
import express from "express";
import dotenv from "dotenv";
//initialize dotenv
dotenv.config();

const app = express();

//use json
app.use(express.json());

// create route / returning hello world
app.get("/", (_req, res) => {
  res.send({
    message: "Hello World",
  });
});

let healthy = true;
let interval = 60000 + Math.floor(Math.random() * 60000);
let time = new Date();

app.get("/health", (_req, res) => {
  res.status(healthy ? 200 : 500).send({
    ok: healthy,
    time: time - new Date()  + interval,
  });
});

// create timeout to change the healthy state in random intervals
setInterval(() => {
  healthy = !healthy;
  interval = Math.floor(Math.random() * 60000);
  time = new Date();
}, interval);


// start app on port 3000

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
