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
const Schedule = () => {

  const [classes,setClasses] = useState<Class[]>([
    // {
    //   id: "0",
    //   title: "Team Meeting"
    //   day: 0, // Monday
    //   duration:1,
    //   color: "#a7c957",
    //   description: "Weekly team sync with department heads",
    //   classroom: "7"
    // },
    // {
    //   id: "2",
    //   title: "Project Review",
    //   day: 0, // Tuesday
    //   duration:1,
    //   color: "#a7c957",
    //   description: "Review Q1 project milestones and deliverables",
    //   classroom: "7"
    // },
    // {
    //   id: "3",
    //   title: "Client Call",
    //   day: 1, // Wednesday
    //   duration:1,
    //   color: "#6a994e",
    //   description: "Discuss new requirements with the client",
    //   classroom: "7"
    // },
    // {
    //   id: "4",
    //   title: "Lunch Break",
    //   day: 2, // Thursday
    //   duration:2,

    //   color: "#a7c957",
    //   description: "Team lunch at the cafeteria",
    //   classroom: "7"
    // },
    // {
    //   id: "5",
    //   title: "Planning",
    //   day: 3, // Friday
    //   duration:1,

    //   color: "#6a994e",
    //   description: "Sprint planning for next week",
    //   classroom: "7"
    // }
  ])
  
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

  function setDefaultClasses(){
    if(classes.length==0){  
      let defaultArr = classes;
      // por cada semana, agregamos 19 filas que son las horas disponibles de ese dia
      for(let j=0;j<columns.length;j++){
        for(let i=0; i<19;i++){
            let defaultC: Class = {
              id: j+'-'+i,
              title: 'test'+i+'-'+j,
              day: j,
              duration: 1,
              classroom: '3T1',
              isDefault:true
            }
            // defaultC.id=i;
            // defaultC.day=j;
            defaultArr.push(defaultC);
        }
      }
      setClasses(defaultArr);
      loadRealSchedule();
    }
  }
  setDefaultClasses()



  function loadRealSchedule(){
    //aqui vamos a cargar las clases de la semana actual desde el server, por ahora carga las ficticias
    let fakeClasses:Class[] = [
      {
        title: "Matematica",
        startHour: 8,
        day: 0, // Monday
        duration:1,
        color: "#a7c957",
        description: "Weekly team sync with department heads",
        classroom: "7"
      },
      {
        title: "Programacion III",
        day: 0, // Tuesday
        startHour: 8,
        duration:4,
        color: "#a7c957",
        description: "Review Q1 project milestones and deliverables",
        classroom: "7"
      },
      {
        title: "Investigacion de Operaciones",
        day: 1, // Wednesday
        startHour: 8,

        duration:1,
        color: "#6a994e",
        description: "Discuss new requirements with the client",
        classroom: "7"
      },
      {
        title: "Ingenieria de software",
        day: 2, // Thursday
        startHour: 8,

        duration:2,
        color: "#a7c957",
        description: "Team lunch at the cafeteria",
        classroom: "7"
      },
      {
        title: "Bases de datos",
        startHour: 10.5,
        day: 3, // F
        duration:3,
        color: "#6a994e",
        description: "Sprint planning for next week",
        classroom: "7"
      },
      {
        title: "Bases de datos",
        startHour: 10.5,
        day: 2, // F
        duration:5,
        color: "#6a994e",
        description: "Sprint planning for next week",
        classroom: "7"
      },
      {
        title: "Seminario",
        startHour: 13.5,
        day: 1, // F
        duration:5,
        color: "#6a994e",
        description: "Sprint planning for next week",
        classroom: "7"
      },
    ]
    //guardamos la respectiva id segun la hora
    fakeClasses.forEach(c => {
      c.id = c.day+'-'+updateId(c);
      setClasses((prevoiusC)=>
        prevoiusC.map((clase)=>
          clase.id === c.id ? c : clase//remplazamos el objeto por el nuevo si tienen el mismo id
        ).concat(prevoiusC.every((item)=>item.id !== c.id)? [c] : [])
        // const classesActualizadas = prevoiusC.filter((clase)=>clase.id != c.id);
        // return [...classesActualizadas,c];
      )
    });
    



    console.log(classes)
  }


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
                <ColumnComponent  key={col.id} column={col} deleteClass={deleteClass} updateClass={updateClass} classes={classes.filter((c) => c.day === col.id)} />
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
    if (activeColumnId == overColumnId) return

    setColums((columns)=>{
      //encontramos los indices del arreglo del id activo y el id de abajo
      const activeColumnIndex = columns.findIndex(
        (col)=> col.id ===activeColumnId
      )

      const overColumnIndex = columns.findIndex(
        (col)=> col.id === overColumnId
      )
      //funcion de dnd kit, actualiza el arreglo de los eventos segun la posicion de arrastre
      return arrayMove(columns,activeColumnIndex,overColumnIndex)
    })
  }

  function onDragOver(event:DragOverEvent){
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
      setClasses((classes)=>{
        //encontramos los indices del arreglo del id activo y el id de abajo
        const activeClassIndex = classes.findIndex(
          (c)=> c.id ===activeClassId
        )
  
        const overClassIndex = classes.findIndex(
          (col)=> col.id === overClassId
        )

        if(classes[activeClassIndex].day!== classes[overClassIndex].day){
          classes[activeClassIndex].day= classes[overClassIndex].day
        }


        //funcion de dnd kit, actualiza el arreglo de los eventos segun la posicion de arrastre
        return arrayMove(classes,activeClassIndex,overClassIndex)
      })
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
        {activeColumn && <ColumnComponent deleteClass={deleteClass} updateClass={updateClass} classes={[]} /*createClass={createClass}*/ column={activeColumn}>
        </ColumnComponent>}
        {activeClass && <ClassComponent c={activeClass} deleteClass={deleteClass} updateClass={updateClass}></ClassComponent>}

      </DragOverlay>
    ,document.body)}
    
  }

  // function createClass(columnId: string | number){ 
  //   const newClass: Class = {
  //     id:classes.length
      
  //   }

  
}

export default Schedule