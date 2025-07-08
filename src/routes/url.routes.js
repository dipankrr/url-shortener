import { Router } from "express";
import { genShortUrl, redirectUrlController } from "../controllers/url.controller.js";

const router = Router()

router.route("/").post(genShortUrl)
router.route("/:shortId").get(redirectUrlController)




export default router