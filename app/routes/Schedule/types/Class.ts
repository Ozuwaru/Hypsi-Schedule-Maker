export type Class = {
  id?: string | number,
  title: string //titulo del evento
  day: number // 0-4 de lunes a viernes sirve como el id de la columna
  //la duracion representa 45 minutos, una unidad vale 45, 2 unidades 90, falta corregir, ahora mismo valen 30
  startHour?: number|string,
  duration?: number,
  //Las horas mas bien deberian venir en un arreglo donde se vean las horas disponibles del profesor
  color?: string,
  description?: string,
  classroom: string,
  isDefault?:boolean
}


export function updateId(c:Class){
  if(c.id == null){
    return (Number(c.startHour) - 8) / 0.5;
  }
  //aqui podriamos poner esta condicion para que si el id es superior a 18, se elimine ese elemento
}

/**
 * Converts a time string like '8:00' or '8:30' to a number (e.g., 8 or 8.5).
 * If input is already a number, returns it as a number.
 * @param startHour - Time string in 'H:00' or 'H:30' format, or a number
 * @returns Number representation of the hour (e.g., 8, 8.5, 9, etc.)
 */
export function parseHourToNumber(startHour: string | number): number {
  if (typeof startHour === 'number') {
    return startHour;
  }
  const [hourStr, minuteStr] = startHour.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  return hour + (minute === 30 ? 0.5 : 0);
}