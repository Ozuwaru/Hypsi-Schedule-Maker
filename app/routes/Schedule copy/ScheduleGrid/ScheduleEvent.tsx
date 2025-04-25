import { type Event } from "../Schedule"
import { useDraggable } from "@dnd-kit/core"
import { FaGripHorizontal } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
interface ScheduleEventProps {
  event: Event
  isExpanded?: boolean
}

export default function ScheduleEvent({ event, isExpanded }: ScheduleEventProps) {
  //Preparamos los atributos a utilizar por el usedraggable
  const {attributes,listeners,setNodeRef, transform} = useDraggable({
    id:event.id
  })


  

    // Nos divide el tiempo en string
    const getTimeInfo=(time:string)=>{

        var splitStr = time.split(':')
        return splitStr
    }

    const getNumberTime=(time:string)=>{

      var splitStr = time.split(':')
      var n = Number(splitStr[0])
      if (Number(splitStr[1])>0){

          n+=(Number(splitStr[1])*0.5/30)

      }
      
      return n
    }
    //obtener Duracion 
    const getDuration= ()=>{
      
      var duration = (getNumberTime(event.endHour)-getNumberTime(event.startHour))
      // console.log(duration)

      if(duration%1==0.5){

        return Math.ceil(duration)*2 * cellHeight

      }

      return duration*3 * cellHeight
    }
    
    const cellWidth = 20 // Cada dia de la columna tiene 20px de ancho
    const cellHeight = 32 // Cada media hora tiene 48px de alto

    //el siguiente objeto viene de cssProperties de React, permite hacer calculos complicados y dinamicos de css que dependen de una variable
    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      top: `${((getNumberTime(event.startHour)-8)*2) * cellHeight}px`, // 8 is the starting hour
      left: `${event.day * cellWidth}%`, // Posicion desde la izquierda para ubicarlo por dia
      height: `${getDuration()}px`, // Altura basada en la hora
      width: `${cellWidth}%`, // Ancho de la columna de un dia,
      backgroundColor: `${event.color}`,
      color: "#FFF"

    }

    const formatTime = (hour: string) => {

      const time= getTimeInfo(hour)
      var hora= Number(time[0])
      var minutos = Number(time[1])
      const period = hora >= 12 ? "PM" : "AM"
      const displayHour = hora % 12 === 0 ? 12 : hora % 12
      return `${displayHour}:${minutos>10  ? minutos : `0${minutos}`} ${period}`

    }

    return (

      <div
        ref={setNodeRef}
        style={style}
        className="absolute z-10 flex flex-col rounded-md p-2 shadow-sm transition-all pointer-events-auto"

      >


        <div className="flex items-center justify-between ">


          <h3 className="font-medium text-sm truncate">{event.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
          <button
            className="h-5 w-5 cursor-crosshair active:cursor-crosshair"
            {...attributes}
            {...listeners}
            aria-label="Drag event"
          >
            {/* <GripVertical className="h-3 w-3" /> */}
            <FaGripHorizontal className="h-3 w-3 text-black hover:text-neutral-600"/>
          </button>
        </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Aula: {event.classroom}
        </div>


        <div className="text-xs text-muted-foreground">
          {formatTime(event.startHour)} - {formatTime(event.endHour)}
        </div>

        
        {isExpanded && (


          <div className="mt-2 text-xs">


            <p>{event.description || "No description available."}</p>
          </div>
        )}
      </div>
    )
    }

