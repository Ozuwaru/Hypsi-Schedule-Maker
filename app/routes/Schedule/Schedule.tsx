import './Schedule.css'
import React, { useEffect, useMemo, useState } from 'react'
import {createPortal} from 'react-dom'
// import { MdAddBox } from 'react-icons/md'
import type { Column } from './types/Column'
import ColumnComponent from './Components/ColumnComponent'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from '@dnd-kit/core'
import {arrayMove, SortableContext} from '@dnd-kit/sortable'
import { updateId, type Class } from './types/Class'
import ClassComponent from './Components/ClassComponent'
import HourColumn from './Components/HourColumn'
import { setDefaultClasses,deleteExtraFalseRows, updateClassesOnMove, addExtraFalseRows, addGivenFalseRows } from './scheduleUtils'
const Schedule = () => {

  const [classes,setClasses] = useState<Class[]>([
    
  ])
  const [firstMounted,SetMounted] = useState<Boolean>(false);
  // const [addedFalseRows,setAdded] = useState(false)//me permite identificar si ya añadi las clases falsas al arreglo, en true, ya fueron aladidas, false no.
  // const [deletedExtraFalseRows,setDeleted] = useState(false)//me permite identificar si ya borre las clases falsas extras del arreglo, en true fueron borradas y en false no.
  
  const [columns,setColums] = useState<Column[]>([
    {
      id:0,
      title: 'Lunes'
    },
    {
      id:1,
      title: 'Martes'
    },
    {
      id:2,
      title: 'Miercoles'
    },
    {
      id:3,
      title: 'Jueves'
    },
    {
      id:4,
      title: 'Viernes'
    },
  ])
  


  setDefaultClasses(classes,columns,setClasses,SetMounted);
  useEffect(() => {
    if (firstMounted) {
      SetMounted(false);
      for (let index = 0; index < columns.length; index++) {
        deleteExtraFalseRows(classes,index,setClasses);
        
      }
    }
  })



  //similar al use effect, actualiza el valor del arreglo segun el valor deñ arreglo columnas
  const columnsId = useMemo(()=>columns.map(col=>col.id),[columns]);
  
  const [activeColumn,setActiveColumn ] = useState<Column | null>(null)
  const [activeClass,setActiveClass ] = useState<Class | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor,{
        activationConstraint:{
          distance:3,//a partir de los 20px arrastrados, empieza el evento
        },
      }
    )
  )

  

  return (
    //this div will be our main box
    <div className="main-schedule-div">
    {/* // <div className="flex "> */}
      <DndContext sensors={sensors} onDragStart={OnDragStart} onDragEnd={OnDragEnd} onDragOver={onDragOver}>

        <div className="center flex gap-2">
          <div className='flex rounded-l-lg'>
            
            <HourColumn/>
            <SortableContext items={columnsId}>

              {columns.map(col=>
                <ColumnComponent  key={col.id} column={col} deleteClass={deleteClass} updateClass={updateClass} setClasses={setClasses} classes={classes.filter((c) => c.day === col.id)} />
              )}
            </SortableContext>
          </div>
          {/* <button 
            className='add-event-button justify-center items-center flex gap-2'
            onClick={createEvent}
          >
            <MdAddBox /> Add Button
          </button> */}
          {renderOverlay()}
        </div>
        
      </DndContext>
    </div>
  )

  function OnDragStart(event:DragStartEvent){
    
    //verificamos que al arrastrar, el tipo de dato sea la columna
    if (event.active.data.current?.type =="Class" ){
      setActiveClass(event.active.data.current.c)
      return;
    }
    console.log("Drag start", event)
  }

  function OnDragEnd(event:DragEndEvent){
    const {active,over}= event
    //si no esta encima de otra columna, lo devolvemos
    if(!over){
      return
    }
    //id del evento arrastrado
    const activeColumnId = active.id
    //id de la columna de abajo del evento
    const overColumnId = over.id
    //si el evento arrastrado y el evento de abajo es el mismo, retornamos 
    
    // console.log(active)
    // console.log(over)
    // deleteExtraFalseRows(classes,active.data.current.c.day,setClasses);
    // addExtraFalseRows(classes,active.data.current.c.day,setClasses);
    if (activeColumnId == overColumnId) return
    
    // setColums((columns)=>{
    //   //encontramos los indies del arreglo del id activo y el id de abajo
    //   const activeColumnIndex = columns.findIndex(
    //     (col)=> col.id ===activeColumnId
    //   )

    //   const overColumnIndex = columns.findIndex(
    //     (col)=> col.id === overColumnId
    //   )
    //   //funcion de dnd kit, actualiza el arreglo de los eventos segun la posicion de arrastre
    //   return arrayMove(columns,activeColumnIndex,overColumnIndex)
    // })
  }

  async function onDragOver(event:DragOverEvent){
    const {active,over}= event
    //si no esta encima de otra columna, lo devolvemos
    if(!over){
      return
    }
    //id del evento arrastrado
    const activeClassId = active.id
    //id de la Classa de abajo del evento
    const overClassId = over.id
    //si el evento arrastrado y el evento de abajo es el mismo, retornamos 
    if (activeClassId == overClassId) return

    const isActiveClass = active.data.current?.type === "Class"
    const isOverClass = over.data.current?.type === "Class"
    
    if (!isActiveClass) return;

    if (isActiveClass && isOverClass){
      // setClasses((classes)=>{
      //   //encontramos los indices del arreglo del id activo y el id de abajo
      //   const activeClassIndex = classes.findIndex(
      //     (c)=> c.id ===activeClassId
      //   )
  
      //   const overClassIndex = classes.findIndex(
      //     (col)=> col.id === overClassId
      //   )

      //   if(classes[activeClassIndex].day!== classes[overClassIndex].day){
      //     classes[activeClassIndex].day= classes[overClassIndex].day
      //   }


      //   //funcion de dnd kit, actualiza el arreglo de los eventos segun la posicion de arrastre
      //   return arrayMove(classes,activeClassIndex,overClassIndex)
      // })   
      // console.log(active)
      // console.log(over)

      // if(active.data.current.c.day!=over.data.current.c.day){
      //   console.log('agregando falsas');
      //   // console.log(active.data.current.c.day);
      //   addGivenFalseRows(active.data.current.c.day,setClasses,active.data.current.c.duration,classes.length);
        
      // }
      
      updateClassesOnMove(active.data.current.c.day,setClasses,activeClassId,overClassId);
      // arrayMove(classes,active.data.current.c.day,over.data.current.c.day);


    }

    const isOverColumn = over.data.current?.type ==="Column";
    if( isActiveClass && isOverColumn){
      setClasses((classes)=>{
        //encontramos los indices del arreglo del id activo y el id de abajo
        const activeClassIndex = classes.findIndex(
          (c)=> c.id ===activeClassId
        )

          classes[activeClassIndex].day= Number(over.id)


        //funcion de dnd kit, actualiza el arreglo de los eventos segun la posicion de arrastre
        return arrayMove(classes,activeClassIndex,activeClassIndex)
      })
    }
  }


  function deleteClass(id:string| number){
    const newClasses = classes.filter((c)=>c.id!== id)
    setClasses(newClasses)
  }
  function updateClass(id:string | number, title:string){

    const newClasses = classes.map(c=>{
      if(c.id!=id){
        return c
      }
      return{...c,title}
    })

    setClasses(newClasses)
  }

  function renderOverlay(){
    if (typeof window !=='undefined'){
      return createPortal(
      <DragOverlay>
        {activeColumn && <ColumnComponent setClasses={setClasses} deleteClass={deleteClass} updateClass={updateClass} classes={[]} /*createClass={createClass}*/ column={activeColumn}>
        </ColumnComponent>}
        {activeClass && <ClassComponent c={activeClass} deleteClass={deleteClass} updateClass={updateClass}></ClassComponent>}

      </DragOverlay>
    ,document.body)}
    
  }
  
}

export default Schedule