import React ,{useEffect,useState} from 'react';
import axios from 'axios';
const App = () => {
  const [item,setItem]= useState([]);
  const [task,setTask]=useState('');
  const SubmitHandler=e=>
  {
    e.preventDefault();
    axios.post('http://localhost:5000/addtasks',{todo:task}).then
    ( arr =>setItem(arr.data));
    setTask('');
  }

  const deleteHandler=id=>
  {
    axios.delete(`http://localhost:5000/deletetask/${id}`).then(
      arr => setItem(arr.data)
    )
  }
  useEffect(()=>
  {
    axios.get('http://localhost:5000/getalltasks').then(
      arr => setItem(arr.data)
    )
  },[]);
  return (
    <center>
      <div className=''><h1 className='text-primary bold'>Todo List Mern Stack Application</h1></div>
      <div className='card bg-dark mt-5' style={{width:"30rem"}}>
        
      <div className='card-body'>
      <div >
      <center>
        <form onSubmit={SubmitHandler} className='form-group '>
          <input type='text' value={task} onChange={(e)=>setTask(e.target.value) } className='form-control form-group' placeholder='Enter the Task'/> 
          <br/>
          <input  type='submit' value='submit' className='btn btn-success '/>       
           </form><br />
        {item.map(task =>
          <div key={task._id} className='form-group form-control'>
            <h2>{task.todo}</h2><button onClick={()=> deleteHandler(task._id)} className='btn btn-danger form-group float-right hover-zoom'>Delete</button>
          </div>)}
      </center>
    </div>
      </div>

    </div>
    </center>
  )
}

export default App
