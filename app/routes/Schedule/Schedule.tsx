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



  function handleDragStart(event:DragStartEvent) {
    console.log('arrastre')
    const event_id = event.active.id as string
    setActiveId(event_id)

    const draggedEvent = events.find((evt)=>evt.id ===event_id) || null
    setActiveEvent(draggedEvent)
  }
  
  function handleDragEnd(event: DragEndEvent) {
    const {active,over} = event
    setActiveId(null);
    setActiveEvent(null)

    if (!over) return

    const eventId = active.id as string
    const cellId = over.id as string

    // Parse the day and hour from the cell ID
    const [day, hour] = cellId.split("-").map(Number)

    // Make sure we have valid values
    if (isNaN(day) || isNaN(hour) || day < 0 || day > 4 || hour < 8 || hour > 19) {
      return
    }



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

