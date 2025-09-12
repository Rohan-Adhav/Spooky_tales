import getData from "../utils/getData.js"
import sendResponses from "../utils/sendResponses.js"
import parseJsonBody from "../utils/parseJsonBody.js"
import addNewSightings from "../utils/addNewSightings.js"
import sanitizeInput from "../utils/sanitizeInput.js"
import { sightingEvents } from "../events/sightingEvents.js"
import { stories } from "../data/stories.js"

export async function handelGet(res) {
    const data = await getData()
    const stringData = JSON.stringify(data)
    sendResponses(res, 200, 'application/json', stringData)
}

export async function handelPost(req, res) {
    try {
        const parsedBody = await parseJsonBody(req)
        const sanitizedBody = sanitizeInput(parsedBody)
        await addNewSightings(sanitizedBody)
        sightingEvents.emit('sighting-added',sanitizedBody)
        sendResponses(res, 201, 'application/json', JSON.stringify(sanitizedBody))

    }
    catch (err) {
        sendResponses(res, 400, 'application/json',JSON.stringify({error:err}) )

    }
}

export async function handleNews(req,res) {
    res.statusCode = 200
    res.setHeader("Content-Type","text/event-stream")
    res.setHeader("Cache-Control","no-cache")
    res.setHeader("Connection","keep-alive")

    setInterval(()=>{
        let randomIndex = Math.floor(Math.random() * stories.length)
        res.write(`data: ${JSON.stringify({
            event:'news-update',
            story : stories[randomIndex]
        })}\n\n`
    )
    },3000)

}