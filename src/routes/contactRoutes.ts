import express from 'express';
import {submitContactForm} from '../controllers/contactController'
const router = express.Router();


// Route to handle form submissions
router.post('/contact', submitContactForm);

export default router;
