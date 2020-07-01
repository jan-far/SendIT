import express from "express";
const app = express();
import 'babel-polyfill';
import dotenv from 'dotenv';
import usingJSOnject from './usingJSObject/routes/route'
import usingDB from './usingDB/routes/route'

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ref = process.env.TYPE==="db"? usingDB : usingJSOnject;

app.use('/api/v1', ref);

// simple route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to janfar application.");
  });
 
  // set port, listen for requests
  const PORT = process.env.PORT || 3000;
  const running = app.listen(PORT, () => {
    `Server is running on port ${PORT}.`
    console.log(`Server is running on port ${PORT}.`);
  });

  export default app;