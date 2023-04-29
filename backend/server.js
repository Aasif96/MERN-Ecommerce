const dotenv = require('dotenv');
dotenv.config();
const app = require("./app")
const connectDb = require('./db/database')


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//database connection
connectDb();

const server = app.listen(process.env.PORT,(req,res)=>{
    console.log(`server running on ${process.env.PORT}`)
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });