import { Router } from 'express';

import {
  listWorkers,
  seedWorkers,
  getMyWorkerProfile,
  createOrUpdateWorkerProfile,
  toggleAvailability
} from '../controllers/workers.js';

import {
  authorize
} from '../middleware/auth.js';

const router = Router();

router.get(
  '/',
  listWorkers
);

router.post(
  '/seed',
  seedWorkers
);

router.get(
  '/me',
  authorize('worker'),
  getMyWorkerProfile
);

router.post(
  '/profile',
  authorize('worker'),
  createOrUpdateWorkerProfile
);

router.patch(
  '/availability',
  authorize('worker'),
  toggleAvailability
);

export default router;