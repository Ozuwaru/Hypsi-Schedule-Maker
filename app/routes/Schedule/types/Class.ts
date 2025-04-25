
export type Class = {
  id?: string | number,
  title: string //titulo del evento
  day: number // 0-4 de lunes a viernes sirve como el id de la columna
  //la duracion representa 45 minutos, una unidad vale 45, 2 unidades 90, falta corregir, ahora mismo valen 30
  startHour?: number,
  duration?: number,
  //Las horas mas bien deberian venir en un arreglo donde se vean las horas disponibles del profesor
  color?: string,
  description?: string,
  classroom: string,
  isDefault?:boolean
}


export function updateId(c:Class){
  if(c.id == null){
    return (c.startHour -  8 )/0.5;
  }
  //aqui podriamos poner esta condicion para que si el id es superior a 18, se elimine ese elemento
}