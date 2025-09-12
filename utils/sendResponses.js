export default function sendResponses(res,statusCode,contentType,playLoad){
    res.statusCode = statusCode
    res.setHeader("Content-Type" , contentType)
    res.end(playLoad)

}