import { nanoid } from 'nanoid'
import { URL } from '../models/url.model.js';
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


const genShortUrl = async (req, res) => {

    const {redirectURL} = req.body

    if (!redirectURL){
        throw new ApiError(400, "url can not be empty");    
    }

    const shortId = nanoid(7)

    const urlDB = await URL.insertOne({
        redirectURL: redirectURL,
        shortURL: shortId,
    })

    if (!urlDB) {
        throw new ApiError(500, "Error while inserting URL data  in DB")
        
    }

    return res.status(201).json(
        new ApiResponse(200, "short url generated successfully", shortId)
    )
}



const redirectUrlController = async (req, res) => {

    const {shortId} = req.params

    const urlDoc = await URL.findOne({
        shortURL: shortId
    })

    if (!urlDoc) {
        throw new ApiError(404, "this short url does not exist")
    }

    const realUrl = urlDoc.redirectURL;

    return res.status(200).redirect(
        realUrl
    )
}




export {genShortUrl, redirectUrlController}