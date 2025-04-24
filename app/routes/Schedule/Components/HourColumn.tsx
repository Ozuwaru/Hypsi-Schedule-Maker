import '../Schedule.css'
const HourColumn = () => {

    function getHoursString(){
      var hours = Array.from({ length: 19 }, (v, i) => i*0.5 + 8 ) 
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
      





  return (
    <div className='hour-col'>
        <div className="column-title-row">

            Horas
        </div>

        {hours.map((hour)=>(
          <div className="cell-box ">
            {getHourColumnString(hour)}
          </div>
        ))}
    </div>
  )
}

export default HourColumn