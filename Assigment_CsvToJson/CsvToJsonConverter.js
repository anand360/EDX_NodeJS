const http = require("http")
const fs = require("fs")
const path = require("path")
const uuidv1 = require("uuid/v1")
const csv = require("csvtojson")
const request = require("request")

const csvtojsonConverter = (url)=>{
	if (url === undefined) return console.log("Empty URL. Please pass csv url as argument.")
	const fetchCsv = (urlF, callback)=>{
		console.log("Conversion started...")
		let csvtojsonArray = []
		csv({
		    toArrayString:true
		})
		.fromStream(request.get(urlF))
		.on("json", (jsonObj, rowIndex)=>{
			csvtojsonArray.push(jsonObj)
		})
		.on("done", (error)=>{
			console.log("CSV Parsing completed.")			
			callback(error, JSON.stringify(csvtojsonArray, null, 4))
		})
		.on("error", (error)=>{
			console.log("Error while reading csv:", error)
			callback(error)
		})
	}

	const folderName = uuidv1()
	fs.mkdirSync(folderName)

	fetchCsv(url, (error, data)=>{
		if(error) return console.log("Error:", error)
		try{
			fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
			fs.writeFileSync(path.join(__dirname, folderName, 'customer-data.json'), data)
		}catch(e){
			console.log("Can't write to file:", e)
		}
		 console.log("JSON file is created.")
	})
}

csvtojsonConverter(process.argv[2])