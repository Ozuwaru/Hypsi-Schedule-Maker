import type { ReactNode } from "react"
//Dias de la semana de clases
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
const hours = Array.from({ length: 20 }, (v, i) => i*0.5 + 8) 


// export function ScheduleGrid() {
export function ScheduleGrid({ children }: { children: ReactNode }) {
// console.log(hours)
return (
    <div className="relative">
      {/* Definimos las filas de los dias*/}
      <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b">
        <div className="border-r p-2 text-center font-medium text-muted-foreground">Time</div>
        {/* Bucle para las columnas de los dias*/}
        {days.map((day, index) => (
          <div key={day} className="border-r p-2 text-center font-medium last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Columnas para las horas*/}
      <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr]">
        {/* Time labels */}
        <div className="col-start-1 col-end-2">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex h-12 items-center justify-center border-r border-b text-sm text-muted-foreground last:border-b-0"
            >
              {/* Si tiene decimal significa que es la media hora seguiente, por lo tanto colocamos 30 minutos */}
              {hour%1!== 0 ? hour-0.5 : hour }:{hour%1!==0 ? '30' : '00'} {hour >= 12 ? "PM" : "AM"}
            </div>
          ))}
        </div>

        {/* Bucle que se repite por cada día de la semana*/}
        {Array.from({ length: days.length }, (_, dayIndex) => (
          <div key={dayIndex} className="relative">
            {/* Como estamos dentro de cada dia, aqui solo hacemos otro bucle por cada hora de ese  dia y dividios la columna */}
            {hours.map((hour) => (

              <div
                key={`${dayIndex}-${hour}`}
                id={`${dayIndex}-${hour}`}
                className="h-12 border-r border-b last:border-b-0 "
                data-hour={hour}
                data-day={dayIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Overlay for events */}
      <div className="absolute top-[41px] left-[80px] right-0 bottom-0 pointer-events-none">{children}</div>
    </div>
  )
}

