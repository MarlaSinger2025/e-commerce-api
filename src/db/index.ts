
import mongoose from 'mongoose';

const connectDB = async () => {
const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
    throw new Error('Missing MONGODB_URI environment variable');
}

const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected successfully: ${conn.connection.name}`);

};

export default connectDB;

 // 👇 temporary database cleanup
// await Product.deleteMany({});
// await Product.syncIndexes();
// console.log('Product collection reset and indexes synced');
