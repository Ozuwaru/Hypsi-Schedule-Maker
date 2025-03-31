import type { ReactNode } from "react"
import './ScheduleGrid.css'
//Dias de la semana de clases
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
const hours = Array.from({ length: 20 }, (v, i) => i*0.5 + 8) 


// export function ScheduleGrid() {
export function ScheduleGrid({ children }: { children: ReactNode }) {
// console.log(hours)
return (
    <div className="relative">
      {/* Definimos las filas de los dias*/}


      <div className="grid-columns bottom-line">


        <div className="grid-title text-muted-foreground">Hora</div>
        {/* Bucle para las columnas de los dias*/}


        {days.map((day, index) => (

          <div key={day} className="grid-title ">
            {day}
          </div>


        ))}
      </div>

      {/* Columnas para las horas*/}
      <div className="grid-columns text-sm text-muted-foreground last:border-b-0">
        {/* Time labels */}


        <div className="col-start-1 col-end-2">


          {hours.map((hour) => (


            <div
              key={hour}
              className="grid-hour-row grid-height right-line bottom-line">
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

              <div key={`${dayIndex}-${hour}`} id={`${dayIndex}-${hour}`} className={'grid-height bottom-line right-line'  } data-hour={hour} data-day={dayIndex}/>
            ))}
          </div>

        ))}

      </div>

      {/* Overlay for events */}
      <div className="absolute top-[41px] left-[80px] right-0 bottom-0 pointer-events-none">{children}</div>

    </div>
  )
}

