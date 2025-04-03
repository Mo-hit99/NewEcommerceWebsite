import express from 'express';
import {   gst
} from '../Controller/GstController.js';

const gst_router = express.Router();

gst_router.get('/gst',gst);

export { gst_router };