import express from 'express';
import path from 'path';
import '@babel/polyfill';
import dotenv from 'dotenv';
import cors from 'cors';
import usingJSOnject from './usingJSObject/routes';
import usingDB from './usingDB/routes';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('.')));
app.use('/UI', express.static(path.join(__dirname, '/UI/')));
app.use('/asset', express.static(path.join(__dirname, 'asset')));

const ref = process.env.TYPE === 'db' ? usingDB : usingJSOnject;

app.use('/api/v1', ref);

app.get('/test', (req, res) => {
  res.status(200).send('Welcome to janfar application.');
});

// simple route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // `Server is running on port ${PORT}.`;
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
