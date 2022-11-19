import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        distance: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        photos: {
            type: [String]
        },
        title: {
            type: String,
            required: true
        },
        rooms: {
            type: [String]
        },
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
        cheapestPrice: {
            type: Number,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false
        }
    }
)

export default mongoose.model('Hotel', HotelSchema)