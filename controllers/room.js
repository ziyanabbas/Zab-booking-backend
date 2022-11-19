import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelld = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {

            await Hotel.findByIdAndUpdate(hotelld, {
                $push: { rooms: savedRoom._id }
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req, res, next) => {
    const hotelld = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelld, {
                $pull: { rooms: req.params.id }
            });
        } catch (error) {
            next(error)
        }
        res.status(200).send("Room has been deleted successfully...")
    } catch (error) {
        next(error)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id);
        res.status(200).json(getRoom)
    } catch (error) {
        next(error)
    }
}
export const getRooms = async (req, res, next) => {
    try {
        const getRoom = await Room.find();
        res.status(200).json(getRoom)
    } catch (error) {
        next(error)
    }
}
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { 'rooomNumbers._id': req.params.id },
            {
                $push: {
                    'rooomNumbers.$.unavailbleDates': req.body.dates
                }
            }
        );
        res.status(200).send("Room availability has been updated successfully...")
    } catch (error) {
        next(error)
    }
}