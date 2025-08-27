import express from "express";
import Router from "./routes/url.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors"
import path from "path";
import { fileURLToPath } from 'url';


const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())
const PORT = process.env.PORT || 3001
app.use('/api/url',Router)
// app.use(cors({
//   origin: process.env.URL,
//   methods: 'GET,POST,PUT,DELETE'
// }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all (for React Router)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const connect = ()=>{
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(()=>{
        console.log("server connected to db")
    }).catch((err)=>{
        console.log(err)
    })
}

app.use("/", Router)

app.listen(PORT,()=>{
    console.log("server started at port "+PORT);
    connect()
})