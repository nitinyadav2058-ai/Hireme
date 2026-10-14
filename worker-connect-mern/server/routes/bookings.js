import { Router } from 'express';

import {
  createBooking,
  listBookings,
  updateBooking
} from '../controllers/bookings.js';

import {
  authorize,
  isAuthenticated
} from '../middleware/auth.js';

const router = Router();

router.get(
  '/',
  isAuthenticated,
  listBookings
);

router.post(
  '/',
  authorize('customer'),
  createBooking
);

router.patch(
  '/:id',
  isAuthenticated,
  updateBooking
);

export default router;