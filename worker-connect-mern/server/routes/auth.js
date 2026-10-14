import { Router } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import passport from '../passport.js';

const router = Router();

router.post(
  '/register',
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role = 'customer'
      } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({
            message:
              'Name, email and password are required'
          });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({
            message:
              'Password must be at least 6 characters'
          });
      }

      if (
        !['customer', 'worker'].includes(role)
      ) {
        return res
          .status(400)
          .json({
            message: 'Invalid role'
          });
      }

      const exists = await User.findOne({
        email: email.toLowerCase()
      });

      if (exists) {
        return res
          .status(409)
          .json({
            message:
              'Email is already registered'
          });
      }

      const hashed = await bcrypt.hash(
        password,
        12
      );

      const user = await User.create({
        name,
        email,
        password: hashed,
        role
      });

      req.login(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: err.message
            });
        }

        res
          .status(201)
          .json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
      });
    } catch (e) {
      res
        .status(400)
        .json({
          message: e.message
        });
    }
  }
);

router.post(
  '/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  }
);

router.post(
  '/logout',
  (req, res, next) =>
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy(
        (sessionErr) => {
          if (sessionErr) {
            return next(sessionErr);
          }

          res.clearCookie(
            'connect.sid'
          );

          res.json({
            message:
              'Logged out successfully'
          });
        }
      );
    })
);

router.get(
  '/me',
  (req, res) => {
    if (!req.isAuthenticated()) {
      return res.json({
        user: null
      });
    }

    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  }
);

export default router;