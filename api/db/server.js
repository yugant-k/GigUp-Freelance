// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// import HttpsProxyAgent from 'https-proxy-agent';


// const connectDB = async () => {
//     try {
//         const proxyUrl = 'http://172.31.2.4:8080';
//         const agent = new HttpsProxyAgent(proxyUrl);

//         const options = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//         socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
//         agent
// };
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, options)
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1)
//     }
// }
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}



export default connectDB