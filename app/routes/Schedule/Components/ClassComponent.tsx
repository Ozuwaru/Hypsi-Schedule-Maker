import React, { useState } from 'react'
import type { Class } from '../types/Class';
import '../Schedule.css';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"


interface Props{
    c : Class;
    deleteClass: (id:string | number) => void;
    updateClass: (id:string | number, title:string)=>void;
}
const ClassComponent = ({c,deleteClass,updateClass} : Props) => {
  const [mouseOver,setMouseOver] = useState(false)
  const [editMode,setEditMode] = useState(false)



  const {setNodeRef,attributes,listeners,transform,transition,isDragging} =useSortable({
      id: c.id,
      data:{
        type: "Class",
        c,
      },
      disabled:editMode,
    })


    const style= {
        transition,
        transform: CSS.Transform.toString(transform),
        'height': `${c.duration*32}px`, // Altura basada en la hora

      }
    
  const toggleEditMode = ()=>{
    setEditMode((prev)=>!prev);
    setMouseOver(false)
  }
  if(isDragging){
    return <div ref={setNodeRef} style={style} className='cell-box class-box opacity-60'>{c.title}</div>
  }


  if(editMode){
    return(
      <div className='cell-box class-box' ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <textarea className='h-[90%] w-full resize-none border-none rounded bg-transparent text-black focus:outline-none' 
            value={c.title}
            autoFocus
            placeholder=''
            onBlur={toggleEditMode}
            onKeyDown={(e)=>{
              if(e.key == "Enter") toggleEditMode()
            }}
            onChange={(e)=>updateClass(c.id,e.target.value)}
            >
            </textarea>
        
      </div>
    )
  }
  
  return (

    
    <div className={`cell-box  ${c.isDefault!= true ? 'class-box':''}`} ref={setNodeRef} style={style}{...(c.isDefault!= true ? { ...attributes, ...listeners } : {})}onMouseEnter={()=>setMouseOver(true)} onMouseLeave={()=>setMouseOver(false)}>

      {c.isDefault!= true? c.title:null} 
      {c.isDefault!= true ? mouseOver && (<button className='class-edit-btn' onClick={toggleEditMode}>< FaEdit className='text-lg'/></button>) :null }

      {c.isDefault!= true ?mouseOver && (<button className='class-delete-btn' onClick={()=>deleteClass(c.id)}><MdDeleteForever className='text-xl'/></button>):null  }
    </div>
  )
}

export default ClassComponent