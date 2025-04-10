import type { ReactNode } from "react"
import './ScheduleGrid.css'
import DroppableCell from "./DroppableCell"
//Dias de la semana de clases
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
//preparamos una lista de las horas laborales
function getHoursString(){
  var hours = Array.from({ length: 20 }, (v, i) => i*0.5 + 8 ) 
  var hours_string: string[]= []
  hours.forEach(hour=>{
    var minutes = ':00'
    if(hour%1!==0){
      hour-=0.5
      minutes= ':30'
    }
    // hours_string.push(`${hour%1!== 0 ? hour-0.5 : hour }:${hour%1!==0 ? '30' : '00'} `)
    hours_string.push(`${hour}${minutes}`)
    
  })

  return hours_string
}
const hours = getHoursString()


function getHourColumnString(hour:string){
  var hour_n= Number(hour.split(':')[0])
  var minutes_n= hour.split(':')[1]


  if(hour_n>12){
    hour_n-=12
  }
  return `${hour_n}:${minutes_n} ${hour_n >= 12 ? "PM" : "AM"}`


}

// export function ScheduleGrid() {
export function ScheduleGrid({ children }: { children: ReactNode }) {
  //Creamos un hook para manejar el arrastre

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
              {/* {Number(hour.split(':')[0])>12 ? `${Number(hour.split(':')[0])-12}:${hour.split(':')[1]} `: `${hour} `}{ Number(hour.split(':')[0]) >= 12 ? "PM" : "AM"} */}
              {getHourColumnString(hour)}
            </div>

          ))}
        </div>

        {/* Bucle que se repite por cada día de la semana*/}
        {Array.from({ length: days.length }, (_, dayIndex) => (

          <div key={dayIndex}  className="relative">
            {/* Como estamos dentro de cada dia, aqui solo hacemos otro bucle por cada hora de ese  dia y dividios la columna */}

            {hours.map((hour) => (
              <DroppableCell key={`${dayIndex}-${hour}`} day={dayIndex} hour={hour}/>
            ))}
          </div>

        ))}

      </div>

      {/*Esta es una casilla} */}
      
      <div className="absolute top-[41px] left-[80px] right-0 bottom-0 pointer-events-none">{children}</div>
      {/* <DroppableCell day={day} hour ={}/> */}


    </div>
  )
}

