
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [students,setStudents]=useState([])
  const [form,setForm]=useState({name:"",email:""})
  const [edit,setEdit]=useState(null)

  const api=import.meta.env.VITE_API

  useEffect(()=>{
    fetchStudents()
  },[students])

  const fetchStudents=async()=>{
    try {
      const res =await axios.get(api)
      setStudents(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const saveStudent=async()=>{
    try {
      if(edit){
        await axios.put(`${api}/${edit}`,form)
        setEdit(null)
      }else{
        await axios.post(api,form)
      }
      setForm({name:"",email:""})
    } catch (error) {
      console.log(error.message)
    }
  }

  const editStudent=(student)=>{
    setForm({name:student.name,email:student.email})
    setEdit(student._id)
  }

  const deleteStudent=async(id)=>{
    try {
      await axios.delete(`${api}/${id}`)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <div className="container">
        <h1 className='text-center mt-5'>Student Manager</h1>
        <form className='d-flex gap-3 p-5 border shadow-lg mt-5 rounded'>
          <input type="text" className='form-control' placeholder='Student Name' value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input type="text" className='form-control' placeholder='Student Email' value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <button type='button' className='btn btn-primary' onClick={saveStudent}>{edit ? "Update" : "Add"}</button>
        </form>
        <table className='table table-striped mt-5 border p-5 shadow rounded'>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s)=>
            <tr  key={s._id}>
              <td>{s.name}</td>
              <td>-{s.email}</td>
              <td>
                <button className='btn btn-warning mx-2' onClick={()=>editStudent(s)}>Edit</button>
                <button className='btn btn-danger' onClick={()=>deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App