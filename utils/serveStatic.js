import path from "node:path"
import fs from "node:fs/promises"
import sendResponses from "./sendResponses.js"
import getContentType from "./getContentType.js"

export default async function serveStatic(req,res,basedir) {
    const publicdir =path.join(basedir,"public")
    const filePath = path.join(publicdir,req.url=== "/" ? 'index.html' : req.url)
    try {
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)
        const content = await fs.readFile(filePath)
        sendResponses(res, 200, contentType, content)
    }
    catch (error) {
        if(error.code === "ENOENT"){
            const content = await fs.readFile(path.join(publicdir,"404.html"))
            sendResponses(res, 404, "text/html", content)
        }
        else{
            sendResponses(res, 500, "text/html", `<html><h1>Server Error: ${err.code}</h1></html>`)

        }
    }
}