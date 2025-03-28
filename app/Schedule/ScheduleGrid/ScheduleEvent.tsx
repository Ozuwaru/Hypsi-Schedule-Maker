import { type Event } from "../Schedule"

interface ScheduleEventProps {
  event: Event
  isExpanded: boolean
}

export default function ScheduleEvent({ event, isExpanded }: ScheduleEventProps) {
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
      console.log(duration)
      if(duration%1==0.5){
        return Math.ceil(duration)*2 * cellHeight
      }
      return duration*3 * cellHeight
    }
    
    const cellWidth = 20 // Cada dia de la columna tiene 20px de ancho
    const cellHeight = 48 // Cada media hora tiene 48px de alto
    const style = {
      top: `${((getNumberTime(event.startHour)-8)*2) * cellHeight}px`, // 8 is the starting hour
      left: `${event.day * cellWidth}%`, // Position based on day
      height: `${getDuration()}px`, // Height based on duration
      width: `${cellWidth}%`, // Width of a day column
      
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
        style={style}
        className="absolute bg-green-400 z-10 flex flex-col rounded-md border p-2 shadow-sm transition-all pointer-events-auto"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm truncate">{event.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
          
          </div>
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

