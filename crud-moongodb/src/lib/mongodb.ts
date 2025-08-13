// import mongoose from "mongoose";
// export  async function connectMongoDB() {
//   try {
//     mongoose.connect(process.env.MONGO_URL!);
  
//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("MongoDB Connected Successfully");
//     });

//     connection.on("error", (error) => {
//       console.log("MongoDB Connection Error: ", error);
//       process.exit();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }


// lib/mongodb.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
