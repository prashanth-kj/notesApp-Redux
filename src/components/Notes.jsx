import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { notesDataContest } from '../context/NotesContext';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux';
import { getNote,createNote,deleteNote } from '../redux/notesSlice';
import {toast} from 'react-toastify'
function Notes() {
       
      let  note = useSelector((state)=>state.note);
      
      let titleRef=useRef();
      let bodyRef=useRef();
      let dispatch=useDispatch();
      let {API_URL}=useContext(notesDataContest);
      let navigate=useNavigate()
      
   let handleSubmit=async(e)=>{
      e.preventDefault();
            let payload={
                  title:titleRef.current.value,
                  body:bodyRef.current.value
            }
            dispatch(createNote(payload));

                try {
                    let res=await axios.post(API_URL,{
                        title:titleRef.current.value,
                        body:bodyRef.current.value
                    })
                    
                     if(res.status==201){
                        getData();
                        navigate('/notes')
                        toast.success("Post successfully")
                     }
                } catch (error) {
                   toast.error("Error occured")
                }

              titleRef.current.value='';
              bodyRef.current.value='';
        
   }

 let handleDelete=async(id)=>{


           dispatch(deleteNote(id))

          try {
            let res=await axios.delete(`${API_URL}/${id}`)
            if(res.status==200){
                  getData();
                  toast.success("Deleted successfully")
            }
          } catch (error) {
            toast.error("Error occured")
          }
            
 }

   let getData=async()=>{
           let res= await axios.get(API_URL);
             dispatch(getNote(res.data))
   }

 useEffect(()=>{
         getData();
 },[])   

  return (
    <>
       <div className='col-lg-10' style={{backgroundColor:"#E3E8F8",minHeight:"100vh"}}>
           <div className='row '> 
                <div className="col-lg-10" >
                <div className=' bg-white shadow  rounded-3 m-3' style={{minHeight:"55vh"}}>
                  <h2 className='p-3 ' style={{color:"#203562"}}>Add a Note</h2>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
                  <Form.Label > <h5 style={{color:"#203562"}}>Title</h5></Form.Label>
                  <Form.Control type="text" placeholder="Enter a title" required  ref={titleRef}/>
                </Form.Group>
                <Form.Group className="m-3" controlId="exampleForm.ControlTextarea1" >
                  <Form.Label> <h5 style={{color:"#203562"}}>Enter your Note</h5></Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Take a Note"  required  ref={bodyRef}/>
                  <Button variant="primary" type='submit' className='mt-4'>Create</Button>
                </Form.Group>
                      
              </Form>
                </div>
            </div>
                  
                 
           </div> 
                 
           <div className='row mt-4 ms-1 '>
                 <div className='col-lg-10'>
                     <div className='d-flex flex-row '>
                       <i className="fa-regular fa-file-lines fa-2xl me-4 mt-3" style={{color:"#203562"}}></i>
                       <h3 style={{color:"#203562"}}>My Notes</h3>
                     </div>
                     <p style={{color:"#203562"}}>Recently Viewed</p>
                     <div className='row '>
                     {
                          note.map((e,i)=>{
                            return  <div className="card-group col-md-4" key={i}>
                            <div className="card mb-2">
                              <div className="card-body">
                                 <div className='d-flex justify-content-between'>
                                    <h4 className="card-title " style={{color:"#203562"}}>{e.title}</h4> 
                                     <div>
                                         <i className="fa-solid fa-pen me-2" style={{color:"#203562"}} onClick={()=>navigate(`/edit/${e.id}`)}></i>
                                         <i className="fa-regular fa-trash-can" style={{color:"#203562"}} onClick={()=>handleDelete(e.id)}></i>
                                     </div>
                                 </div>
                                
                                <p className="card-text">{e.body}</p>
                                <p className="card-text"><small className="text-body-secondary">3 mins ago</small></p>
                              </div>
                            </div>
                            </div>
                                
                            
                          })
                        }
                     </div>
                 </div>
             </div>   
       </div>
    </>
  )
}

export default Notes