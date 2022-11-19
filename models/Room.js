import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },
        price: {
            type: String
        },
        maxpeople: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        rooomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    }
)

export default mongoose.model('room', RoomSchema)