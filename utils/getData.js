import path from "node:path"
import fs from  "node:fs/promises"

export default async function getData() {

    try{
        const pathJson = path.join("data","data.json")
        const data = await fs.readFile(pathJson,'utf-8')
        const parsedData = JSON.parse(data)
        return parsedData
        
    }
    catch{
        return []
    }
  return 'I am from getData()!'

    
}