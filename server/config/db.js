// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }


// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(mongoURI);

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connectDB;

