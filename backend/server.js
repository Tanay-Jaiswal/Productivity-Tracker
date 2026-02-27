const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
app.use(cors())
app.use(express.json())
// 🔥 MongoDB Connection
mongoose.connect("mongodb+srv://jaiswaltanay535_db_user:OmT9VJ7mW5VeWdzQ@productivity-cluster.dt2bwf6.mongodb.net/?appName=productivity-cluster")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.get("/", (req,res)=>{
  res.send("Backend running 🚀")
})

app.listen(5000, ()=>{
  console.log("Server running on port 5000")
})