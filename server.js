import express from 'express';
import path from 'path';
import session from 'client-sessions';
import '@babel/polyfill';
import dotenv from 'dotenv';
import cors from 'cors';
import { userSession } from './usingDB/middleware';

import usingJSOnject from './usingJSObject/routes';
import usingDB from './usingDB/routes';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/', express.static(path.join(__dirname, '.')));
app.use(express.static('src'));
// app.use('/asset', express.static(path.join(__dirname, 'asset')));

app.use(session({
  cookieName: 'authenticated',
  secret: 'thisisjustsomethingrandom',
  duration: 2 * 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: {
    httpOnly: true,
    // secure: true,
  },
}));

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
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
