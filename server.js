import http from "node:http"
import path from "node:path"
import serveStatic from "./utils/serveStatic.js"
import getData from "./utils/getData.js"
import { handelGet, handelPost,handleNews } from "./handlers/routeHandlers.js"

const PORT = process.env.PORT || 8000;

const __dirname = import.meta.dirname


const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === "GET") {
            return await handelGet(res)
        }
        else if (req.method === "POST") {
            return await handelPost(req, res)
        }
    } else if (req.url === "/api/news") {

        return await handleNews(req,res)
    }
    else if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => { console.log(`Server Listening on http://localhost:${PORT}/`) })
