import validUrl from "valid-url";
import  { nanoid } from "nanoid"
import urlSchema from "../schema/url.js"

// Controller to handle URL shortening requests
const getData = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!validUrl.isUri(originalUrl)) {
        return res.json({ status: 400, message: "Invalid URL" });
        }

        const shortId = nanoid(6);
        const find = await urlSchema.findOne({ shortId });

        if (find) {
        return res.json({ status: 400, message: "Error, Try again" });
        }

        const save = await urlSchema({ shortId, originalUrl }).save();

        if (save) {
        return res.json({
            status: 200,
            message: "saved Successfully",
            shortUrl: process.env.URL + shortId,
        });
        }
    } catch (err) {
        console.error("Error in getData:", err);
        return res.json({ status: 400, message: "Internal server error" });
    }
    
}

// Controller to handle redirection from short URL to original URL
const redirect = async (req,res)=>{
    try {
        const { shortId } = req.params;
        const find = await urlSchema.findOne({ shortId });

        if (find) {
        return res.redirect(find.originalUrl);
        } else {
        return res.send("Url not found");
        }
    } catch (err) {
        console.error("Error in redirect:", err);
        return res.json({status: 400, message: "Internal server error"})
    }

}

export {getData, redirect}