import express from "express";
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType,
    getHotelRooms
} from '../controllers/hotel.js';

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/',verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);
router.get('/find/:id', getHotel);
router.get('/', getHotels);
router.get('/countbycity', countByCity);
router.get('/countbytype', countByType);
router.get('/room/:id', getHotelRooms);

export default router;

