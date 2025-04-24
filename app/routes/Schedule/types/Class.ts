
export type Class = {
    id: string | number,
    title: string //titulo del evento
    day: number // 0-4 de lunes a viernes sirve como el id de la columna
    //la duracion representa 45 minutos, una unidad vale 45, 2 unidades 90, falta corregir, ahora mismo valen 30
    duration: number,
    //Las horas mas bien deberian venir en un arreglo donde se vean las horas disponibles del profesor
    color?: string,
    description?: string,
    classroom: string,
    isDefault?:boolean
  }
