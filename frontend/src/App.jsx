import { useState } from "react"

function App() {
  
  const [task, setTask] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if(task==="") return
    setTasks([...tasks, {text: task, date, time, done:false}])
    setTask("")
    setDate("")
    setTime("")
  }

  const toggleTask = (index) => {
    const newTasks = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
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
            <input type="checkbox" onChange={()=>toggleTask(i)} />
          </div>
        ))}


      </div>
    </div>
  )
}

export default App
