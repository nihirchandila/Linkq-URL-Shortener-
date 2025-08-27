import validUrl from "valid-url";
import  { nanoid } from "nanoid"
import urlSchema from "../schema/url.js"

// Controller to handle URL shortening requests
const getData = async (req, res) => {
    const { originalUrl } = req.body;
    // Check if the provided URL is valid
    if (validUrl.isUri(originalUrl)){
        const shortId = nanoid(6) // Generate a unique 6-character ID
        // Check if the generated shortId already exists
        const find = await urlSchema.findOne({ shortId: shortId });
        if(find){
            // If shortId exists, return an error
            return res.json({status: 400,message: "Error, Try again"});
        }else{
            // Save the new short URL mapping to the database
            const save = await urlSchema({ shortId: shortId, originalUrl: originalUrl }).save();
            if(save){
               // Respond with the shortened URL
               res.json({status: 200,message: "saved Successfully", shortUrl : process.env.URL+shortId});
            }
        }
        
    } else {    
        // If the URL is invalid, return an error
        return res.json({status: 400,message: "Invalid URL"});
    }
}

// Controller to handle redirection from short URL to original URL
const redirect = async (req,res)=>{
    const { shortId } = req.params;
    // Find the original URL by shortId
    const find = await urlSchema.findOne({ shortId: shortId });
    if(find){
        // Redirect to the original URL if found
        res.redirect(find.originalUrl);
    }else{
        // If not found, send an error message
        res.send("Url not found");   
    }

}

export {getData, redirect}