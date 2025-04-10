import type { Column } from '../types/Column'
// import { MdDeleteForever } from "react-icons/md";
import '../Schedule.css';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"
import type { Class } from '../types/Class';
import ClassComponent from './ClassComponent';
import { useMemo } from 'react';
interface Props{
    column:Column;
    deleteClass: (id:string | number) => void;
    updateClass: (id:string | number, title:string)=>void;

    classes : Class[];
}

const ColumnComponent = (props: Props) => {
  const {column,classes,deleteClass,updateClass} = props
  const {setNodeRef,attributes,listeners,transform,transition,isDragging} =useSortable({
    id: column.id,
    data:{
      type: "Column",
      column
    },
  })

  const style= {
    transition,
    transform: CSS.Transform.toString(transform),
  }


  //esto nos permite modificar como se verá nuestro overlay a como queramos
  if(isDragging){
    return     <div ref={setNodeRef} style={style} className='column-day opacity-60 bg-amber-950  border-2 border-black '></div>

  }

  const classesIds =useMemo(()=>{
    return classes.map((c)=>c.id)
  },[classes])

  return (
    <div ref={setNodeRef} style={style} className='column-day '>
        {/*COLUMN TITLE  */}
        <div {...attributes} {...listeners} className="column-title-row">

          <div className="flex gap-2">

            {/* <div className="flex w-4 justify-center items-center px-2  text-sm rounded-full  ">0</div> */}
            {column.title}
          </div>
          {/* <button ><MdDeleteForever className='text-xl'/></button> */}
        </div>
        {/* task container */}
        <div className= 'w-full flex flex-col flex-grow  p-3 overflow-x-hidden overflow-y-auto'>
          <SortableContext items={classesIds}>

            {classes.map(c=>(
              <div key={column.id+"-"+c.id} className="">
                <ClassComponent deleteClass={deleteClass} updateClass={updateClass} key={c.id} c={c}/>
              </div>
            ))}
          </SortableContext>
        </div>
        
        {/* <button className="add-class-btn" >Agregar</button> */}
    </div>
    
  )
}

export default ColumnComponent