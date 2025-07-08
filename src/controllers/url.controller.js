import { nanoid } from 'nanoid'
import { URL } from '../models/url.model.js';
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


const genShortUrl = async (req, res) => {

    const {redirectURL, customPath} = req.body

    if (!redirectURL){
        throw new ApiError(400, "url can not be empty");    
    }

    if (!customPath?.trim()) {
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

    const customPathDB = await URL.findOne({
        shortURL: customPath
    })
    
    if (customPathDB) {
        throw new ApiError(400, "this path already in use")
    }

    const urlDB = URL.insertOne({
        redirectURL: redirectURL,
        shortURL: customPath
    })

    if (!urlDB) {
        throw new ApiError(500, "something went wrong while saving data")
    }

    return res.status(201).json(
        new ApiResponse(201, "short url generated successfully", customPath)
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

const checkCustomUrlAvailability = async (req, res) => {

    const {customUrl} = req.body

    if (!customUrl?.trim()) {
        throw new ApiError(400, "custom url is empty")
    }

    const shortUrlDB = await URL.findOne({
        shortURL: customUrl
    })

    if (shortUrlDB) {
       return res.status(400).json(
        new ApiResponse(400, "path not available", {available: false})
       )
    }

    return res.status(200).json(
        new ApiResponse(200, "path available", {available: true})
    )
    
}

// const genCustomShortUrl = async (req, res) => {

//     const {redirectURL, customPath} = req.body

//     if (!customPath?.trim() || !redirectURL?.trim()) {
//         throw new ApiError(404, "custom path/redirect url can not be empty")
//     }

//     const customPathDB = await URL.findOne({
//         shortURL: customPath
//     })

//     if (customPathDB) {
//         throw new ApiError(400, "this path is already in use")
//     }

//     await URL.insertOne({
//         shortURL: customPath
//     })


// }




export {
    genShortUrl, 
    redirectUrlController,

}