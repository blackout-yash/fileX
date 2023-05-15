import mongoose from "mongoose";

export const connectDB = async (url) => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL || url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`Database connected 🥳 🥳 🥳 🥳`);
    } catch (error) {
        console.error(`Connection failed ☹️ ☹️ ☹️ ☹️\n`, error);
    }
}