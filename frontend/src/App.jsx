import { useState } from "react"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if(task==="") return
    setTasks([...tasks, {text: task, done:false}])
    setTask("")
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
          placeholder="Add task"
        />
        <button onClick={addTask}>Add</button>

        {tasks.map((t,i)=>(
          <div key={i}>
            <input type="checkbox" onChange={()=>toggleTask(i)} />
            {t.text}
          </div>
        ))}

      </div>
    </div>
  )
}

export default App
