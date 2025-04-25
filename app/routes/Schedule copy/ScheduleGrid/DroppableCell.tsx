import './ScheduleGrid.css'
import { useDroppable } from '@dnd-kit/core'
interface DroppableProps{
  
  day:number,
  hour:string
}
const DroppableCell = ({day,hour}:DroppableProps) => {
    const {setNodeRef}= useDroppable({
        id: `${day}-${hour}`
    })
  return (
    <div ref={setNodeRef} key={`${day}-${hour}`} id={`${day}-${hour}`} className='grid-height bottom-line right-line'   data-hour={hour} data-day={day}>
    </div>
  )
}

export default DroppableCell