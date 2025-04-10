
export type Class = {
    id: string | number,
    title: string //titulo del evento
    day: number // 0-4 de lunes a viernes sirve como el id de la columna
    startHour: string // hora donde inicia el intervalo
    endHour: string // hora donde termina el intervalo
    //Las horas mas bien deberian venir en un arreglo donde se vean las horas disponibles del profesor
    color: string
    description?: string
    classroom: string
  }
