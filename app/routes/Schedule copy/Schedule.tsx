"use client"

import { useState, type DragEventHandler } from "react"
import { ScheduleGrid } from "./ScheduleGrid/ScheduleGrid"
import ScheduleEvent from "./ScheduleGrid/ScheduleEvent"
import {DndContext, DragOverlay, type DragStartEvent, type DragEndEvent} from '@dnd-kit/core'

export type Event = {
  id: string
  title: string //titulo del evento
  day: number // 0-4 de lunes a viernes
  startHour: string // hora donde inicia el intervalo
  endHour: string // hora donde termina el intervalo
  //Las horas mas bien deberian venir en un arreglo donde se vean las horas disponibles del profesor
  color: string
  description?: string
  classroom: string
}


//Puedo hacer elfuncionamiento de arrastre utilizando dnd-kit/core

// Eventos de Prueba
const initialEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    day: 0, // Monday
    startHour: '9:00',
    endHour: '10:00',
    color: "#a7c957",
    description: "Weekly team sync with department heads",
    classroom: "7"
  },
  {
    id: "2",
    title: "Project Review",
    day: 1, // Tuesday
    startHour: '13:00',
    endHour: '14:00',
    color: "#a7c957",
    description: "Review Q1 project milestones and deliverables",
    classroom: "7"
  },
  {
    id: "3",
    title: "Client Call",
    day: 2, // Wednesday
    startHour: '12:00',
    endHour: '13:05',
    color: "#6a994e",
    description: "Discuss new requirements with the client",
    classroom: "7"
  },
  {
    id: "4",
    title: "Lunch Break",
    day: 3, // Thursday
    startHour: '15:00',
    endHour: '17:30',
    color: "#a7c957",
    description: "Team lunch at the cafeteria",
    classroom: "7"
  },
  {
    id: "5",
    title: "Planning",
    day: 4, // Friday
    startHour: '12:00',
    endHour: '13:00',
    color: "#6a994e",
    description: "Sprint planning for next week",
    classroom: "7"
  },
]


export default function Schedule() {
  const [events, setEvents] = useState<Event[]>(initialEvents)

  //Preparamos las variables con las que manejaremos los eventos de arrastre
  const [activeId,setActiveId] = useState<string|null>(null)

  //variables para manejar el muestreo de informacion
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)

  const [activeEvent, setActiveEvent] = useState<Event | null>(null)

  function updateEvents(day:number, hour:string, eventId:string){
    //Creamos una copia del arreglo
    var eventsCopy = events

    eventsCopy.forEach(evt => {
      //Si las id son iguales, significa que encontramos el evento a modificar
      if(evt.id == eventId){
        //calculamos la duracion
        var start_time = Number(evt.startHour.split(':')[0]) + (Number(evt.startHour.split(':')[1])/60)
        var end_time = Number(evt.endHour.split(':')[0]) + (Number(evt.endHour.split(':')[1])/60)
        var duration = end_time-start_time

        var final_hour =Math.floor(duration)+Number(hour.split(':')[0])
        var final_minutes =(Number(hour.split(':')[1])+ (duration - Math.floor(duration))*60).toFixed(0)




        console.log('start hour:',start_time)
        console.log('duration',duration)
        console.log('final hour:',final_hour)
        evt.startHour = hour
        evt.day = day
        evt.endHour = `${final_hour}:${final_minutes}`
      }

    });

    return eventsCopy
  }

  function handleDragStart(event:DragStartEvent) {
    console.log('arrastre')
    const event_id = event.active.id as string
    setActiveId(event_id)

    const draggedEvent = events.find((evt)=>evt.id ===event_id) || null
    setActiveEvent(draggedEvent)
  }

  
  function handleDragEnd(event: DragEndEvent) {
    //Obtenemos el evento activo y la celda sobre la que esta dicho evento
    const {active,over} = event
    //limpiamos las variables de estado
    setActiveId(null);
    setActiveEvent(null)

    //si no esta sobre una celda, falló la func
    if (!over) return

    const eventId = active.id as string
    const cellId = over.id as string

    // Obtenemos el dia y hora de la celda 
    const day = Number(cellId.split("-")[0])
    const hour = cellId.split("-")[1]
    const hour_number  = Number(hour.split(':')[0])

    // 
    if (isNaN(day) || isNaN(hour_number) || day < 0 || day > 4 || hour_number < 8 || hour_number > 17) {
      return
    }

    setEvents(updateEvents(day,hour,eventId))
    
    // para hacer el arrastre ahora debo ver en que dia y hora fue arrastrado el evento y modificar su valor dentro del arreglo





    // setEvents((prevEvents) => {
    //   return prevEvents.map((evt) => {
    //     if (evt.id === eventId) {
    //       // Update the day and start hour based on where it was dropped
    //       return {
    //         ...evt,
    //         day,
    //         startHour: hour,
    //       }
    //     }
    //     return evt
    //   })
    // })



  }

  return (
  //Aqui creamos el contexto de dnd para hacer los eventos arrastrables
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
        
      <div className="rounded-lg  bg-card  mx-auto max-w-3/6 " >

        <ScheduleGrid>
          {events.map((event) => (
            
            //para cada evento en nuestro arreglo, reperimos un schedule event
              <ScheduleEvent 
                key={event.id}
                event={event}
                isExpanded={expandedEventId === event.id}
              />
          ))}

        </ScheduleGrid> 
        {/* <DragOverlay adjustScale style={{ transformOrigin: '4 4' }}>
                {activeEvent ? <ScheduleEvent key={activeEvent.id} event={activeEvent} /> : null}
        </DragOverlay> */}
      </div>
    </DndContext>


  )
}

