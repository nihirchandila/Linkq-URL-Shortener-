import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId : {
        type: "string",
        unique: true,
    },
    originalUrl: {
        type:"string",
    }

})

export default mongoose.model("url", urlSchema);