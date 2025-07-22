import express from 'express';
import { getAllFAQs, createFAQ, deleteFAQ } from '../controllers/faqController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getAllFAQs);

// Protected routes
router.post('/', createFAQ);
router.delete('/:id', auth, deleteFAQ);

export default router;
