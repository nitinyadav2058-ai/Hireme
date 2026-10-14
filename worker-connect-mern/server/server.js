import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import passport from './passport.js';

import workerRoutes from './routes/workers.js';
import bookingRoutes from './routes/bookings.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

const mongoUri =
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/workerconnect';

const clientUrl =
  process.env.CLIENT_URL ||
  'http://localhost:5173';

app.use(
  cors({
    origin: clientUrl,
    credentials: true
  })
);

app.use(
  express.json()
);

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      'workerconnect-local-secret-change-me',

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: 'sessions'
    }),

    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge:
        1000 *
        60 *
        60 *
        24 *
        7
    }
  })
);

app.use(
  passport.initialize()
);

app.use(
  passport.session()
);

app.get(
  '/api/health',
  (_req, res) =>
    res.json({
      ok: true,
      service: 'WorkerConnect API',
      database: 'local MongoDB'
    })
);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/workers',
  workerRoutes
);

app.use(
  '/api/bookings',
  bookingRoutes
);

const port =
  process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(
      mongoUri
    );

    console.log(
      `MongoDB connected: ${mongoUri}`
    );

    app.listen(
      port,
      () =>
        console.log(
          `API running on http://localhost:${port}`
        )
    );
  } catch (err) {
    console.error(
      'MongoDB connection failed:',
      err.message
    );

    process.exit(1);
  }
};

start();