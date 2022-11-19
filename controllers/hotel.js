import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    const hotelld = req.params.hotelid;
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();

        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted successfully..")
    } catch (error) {
        next(error)
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}
export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 9999 }
        }).limit(req.query.limit)

        res.status(200).json(hotels);
    } catch (error) {
        next(error)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments("hotel")
        const appartmentCount = await Hotel.countDocuments("appartment")
        const villaCount = await Hotel.countDocuments("villa")
        const resortCount = await Hotel.countDocuments("resort")
        const cabinCount = await Hotel.countDocuments("cabin")

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "appartment", count: appartmentCount },
            { type: "villa", count: villaCount },
            { type: "resort", count: resortCount },
            { type: "cabin", count: cabinCount }
        ])
    } catch (error) {
        next(error)
    }
}
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}