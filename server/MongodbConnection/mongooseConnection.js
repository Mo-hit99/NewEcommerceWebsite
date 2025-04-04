import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongooseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL
        );
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error: ", error);
    }
    }
export default mongooseConnection;