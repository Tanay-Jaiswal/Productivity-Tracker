import { useState, useEffect } from "react"

function App() {
  
  const [task, setTask] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err))
  }, [])

  const addTask = async () => {
    if(task==="") return
      const newTask = { text: task, date, time, done:false }
      try {
        const res = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask)
        })
        const data = await res.json()
        setTasks([...tasks, data])
        setTask("")
        setDate("")
        setTime("")
      } catch (err) {
      console.log(err)
      }
  }

  const toggleTask = async (taskObj) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskObj._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done: !taskObj.done })
        }
      )
      const updatedTask = await res.json()
      setTasks(tasks.map(t =>
        t._id === updatedTask._id ? updatedTask : t
    ))
    } catch (err) {
      console.log(err)
    }
  }
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      })
      setTasks(tasks.filter(t => t._id !== id))
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div style={{display:"flex"}}>
      
      <div style={{width:"30%", padding:"20px", borderRight:"1px solid gray"}}>
        <h2>Calendar</h2>
      </div>

      <div style={{width:"70%", padding:"20px"}}>
        <h2>Tasks</h2>

        <input 
          value={task}
          onChange={(e)=>setTask(e.target.value)}
          placeholder="Task"
        />

        <input 
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        <input 
          type="time"
          value={time}
          onChange={(e)=>setTime(e.target.value)}
        />

        <button onClick={addTask}>Add</button>

        {tasks.map((t,i)=>(
          <div key={i} style={{
            display:"flex",
            justifyContent:"space-between",
            marginTop:"10px",
            padding:"8px",
            border:"1px solid gray",
            borderRadius:"5px"
            }}>
            <span style={{textDecoration: t.done ? "line-through" : "none"}}>
              {t.text} ({t.date} {t.time})
            </span>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t)}
            />

            <button
              style={{marginLeft: "10px"}}
              onClick={() => deleteTask(t._id)}
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}
export default App