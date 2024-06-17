import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectDB = async () => {
    const {connection} = mongoose.connect(process.env.DB_URL);

    if(connection) {
        console.log('Database connected at ', connection.host);
    }
}

export default connectDB;