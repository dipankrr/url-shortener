import { nanoid } from 'nanoid'
import { URL } from '../models/url.model.js';


const genShortUrl = async (req, res) => {

    const {redirectURL} = req.body

    if (!redirectURL){
        throw console.error("URL is must");    
    }

    const shortId = nanoid(7)

    const urlDB = await URL.insertOne({
        redirectURL: redirectURL,
        shortURL: shortId,
    })

    if (!urlDB) {
        throw console.error("Error while inserting URL data  in DB");
        
    }

    return res.status(201).json(
        {
            'message': shortId
        }
    )
}



const redirectUrlController = async (req, res) => {

    const {shortId} = req.params

    const urlDoc = await URL.findOne({
        shortURL: shortId
    })

    if (!urlDoc) {
        throw console.error("Short url does not exist"); 
    }

    const realUrl = urlDoc.redirectURL;

    return res.status(200).redirect(
        realUrl
    )
}




export {genShortUrl, redirectUrlController}