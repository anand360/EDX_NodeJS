var mongoDbClient = require("mongodb").MongoClient;
var async = require("async");

let url = "mongodb://localhost:27017";
let customers = require("./m3-customer-data.json");
let customerAddress = require("./m3-customer-address-data.json");

let tasks = [];
let limit = parseInt(process.argv[2], 10) || 1000;
mongoDbClient.connect(url, (error, database)=>{
    if(error){
        console.log("Error in connecting MongoDB.");
        return process.exit(1);
    }

    let db = database.db("migration");
    customers.forEach((customer, index, list) => {
        customers[index] = Object.assign(customer, customerAddress[index]);
    });

    for (let i = 0; i < customers.length; i+=limit) {
        let start = i;
        let end = i + limit > customers.length ? customers.length - 1 - i : i + limit;
        tasks.push((done) => {
            console.log("Processing: " + start + "-" + end);
            db.collection("customerdata").insert(customers.slice(start, end), (error, result)=>{
                done(error, result);
            });
        });      
    }

    console.log("Launching migration of " + tasks.length + " tasks in parallel.");
    var startTime = Date.now();
    console.info("Start time: " + startTime);

    async.parallel(tasks, (error, result)=>{
        var endTime = Date.now();
        console.info("End time: " + endTime);
        console.info("total Elapsed time: " + (endTime - startTime));
        // console.log(result);
        database.close();
    })
});