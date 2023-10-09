import { createSlice } from "@reduxjs/toolkit";

export const notesSlice=createSlice({
     name:"note",
     initialState:[

     ],
    
     reducers:{
          getNote:(state,action)=>{
            state.length = 0;
            state.push(...action.payload);
          },
          createNote:(state,action)=>{ 
              state.push({
                  title:action.payload.title,
                  body: action.payload.body
              })
               action.payload.title='';
               action.payload.body='';
          },
           
          deleteNote:(state,action)=>{
                
                 let id=action.payload;
                 return  state.filter((note)=>note.id !== id)

          }
     }
})

export const{getNote,createNote,updateNote,deleteNote}=notesSlice.actions;
export default notesSlice.reducer;