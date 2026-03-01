const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Task = require("./models/Task")
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
// Create Task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body)
    await newTask.save()
    res.json(newTask)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
// Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
// Update Task (Toggle Done)
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    )
    res.json(updatedTask)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
app.listen(5000, ()=>{
  console.log("Server running on port 5000")
})