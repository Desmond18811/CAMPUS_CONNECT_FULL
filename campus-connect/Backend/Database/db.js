import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(' 🔴 Database connection error: ', error);
        process.exit(1);
    }
}

export default connectDb