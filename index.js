import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT =process.env.PORT || 8000;
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something is wrong";
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack
    })
})

const connect =  ()=>{
    try {
        mongoose.connect(process.env.MONGODB);
        console.log("db connected...");
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("Mongodb connected");
})
// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });
app.listen(PORT, ()=>{
    connect()
    console.log(`Server is running on http://localhost:${PORT}`);
})

