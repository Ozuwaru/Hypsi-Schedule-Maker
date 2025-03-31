"use client"

import { useState } from "react"
import { ScheduleGrid } from "./ScheduleGrid/ScheduleGrid"
import ScheduleEvent from "./ScheduleGrid/ScheduleEvent"
// import { ScheduleEvent } from "./ScheduleEvent"

export type Event = {
  id: string
  title: string //titulo del evento
  day: number // 0-4 de lunes a viernes
  startHour: string // 0-23
  endHour: string // in hours
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
  // creamos un arreglo de objetos de eventos y un actualizador
  const [events, setEvents] = useState<Event[]>(initialEvents)

  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)




  return (
  //   <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
  //     <div className="rounded-lg border bg-card shadow">
  //       <ScheduleGrid>
  //         {events.map((event) => (
  //           <ScheduleEvent
  //             key={event.id}
  //             event={event}
  //             isExpanded={expandedEventId === event.id}
  //             onClick={() => handleEventClick(event.id)}
  //           />
  //         ))}
  //       </ScheduleGrid>
  //     </div>
  //   </DndContext>
  // )
  <div className="rounded-lg  bg-card  mx-auto max-w-3/6 ">

    <ScheduleGrid>
      {events.map((event) => (
        <ScheduleEvent
          key={event.id}
          event={event}
          isExpanded={expandedEventId === event.id}
        />
      ))}
    </ScheduleGrid> 
  </div>
  )
}

