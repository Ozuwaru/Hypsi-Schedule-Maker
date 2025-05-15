import type { UniqueIdentifier } from "@dnd-kit/core";
import  {type Class,updateId } from "./types/Class";
import type { Column} from "./types/Column";

export function setDefaultClasses(
    classes : Class[],
    columns: Column[],
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>,
    setMounted: React.Dispatch<React.SetStateAction<boolean>>
){
    if(classes.length==0){  
      let defaultArr = classes;
      // por cada semana, agregamos 19 filas que son las horas disponibles de ese dia
      for(let j=0;j<columns.length;j++){
        for(let i=0; i<19;i++){
            let defaultC: Class = {
              id: j+'-'+i,
              title: 'test'+i+'-'+j,
              day: j,
              duration: 1,
              classroom: '3T1',
              isDefault:true
            }
            // defaultC.id=i;
            // defaultC.day=j;
            defaultArr.push(defaultC);
        }
      }
      setClasses(defaultArr);
      // console.log(classes)
      loadRealSchedule(setClasses);
      setMounted(true);
    }
}


export  function loadRealSchedule(
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
  ){
   let realClasses:Class[] = [
    {
      title: "Matematica",
      startHour: 8,
      day: 0, // Monday
      duration:1,
      color: "#a7c957",
      description: "Weekly team sync with department heads",
      classroom: "7"
    },
    {
      title: "Programacion III",
      day: 0, // Tuesday
      startHour: 8,
      duration:4,
      color: "#a7c957",
      description: "Review Q1 project milestones and deliverables",
      classroom: "7"
    },
    {
      title: "Investigacion de Operaciones",
      day: 1, // Wednesday
      startHour: 8,
   
      duration:1,
      color: "#6a994e",
      description: "Discuss new requirements with the client",
      classroom: "7"
    },
    {
      title: "Ingenieria de software",
      day: 2, // Thursday
      startHour: 8,
   
      duration:2,
      color: "#a7c957",
      description: "Team lunch at the cafeteria",
      classroom: "7"
    },
    {
      title: "Arquitectura del computador",
      startHour: 10.5,
      day: 3, // F
      duration:3,
      color: "#6a994e",
      description: "Sprint planning for next week",
      classroom: "7"
    },
    {
      title: "Bases de datos",
      startHour: 10.5,
      day: 2, // F
      duration:5,
      color: "#6a994e",
      description: "Sprint planning for next week",
      classroom: "7"
    },
    {
      title: "Seminario",
      startHour: 10.5,
      day: 1, // F
      duration:5,
      color: "#6a994e",
      description: "Sprint planning for next week",
      classroom: "7"
    },
       ]
    //guardamos la respectiva id segun la hora
    realClasses.forEach(c => {
      //preparamos el id de la clase real
      c.id = c.day+'-'+updateId(c);
      c.isDefault=false;
      setClasses((prevoiusC)=>

        prevoiusC.map((clase)=>

          clase.id === c.id ? c : clase//remplazamos el objeto por el nuevo si tienen el mismo id
        ).concat(prevoiusC.every((item)=>item.id !== c.id)? [c] : [])
        // const classesActualizadas = prevoiusC.filter((clase)=>clase.id != c.id);
        // return [...classesActualizadas,c];
      )
      // setAdded(true);

    });
    

    //basado en la duracion de las clases reales, necesitamos eliminar clases falsas de cada dia, asi evito que hayan clases extra
    //luego de cada evento de arrastre, hay que verificar si hay menos clases falsas de las que deberia para añadirlas


}



export function deleteExtraFalseRows(
    classes: Class[],
  columnID: Number,
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>
) {
  // console.log(columnID);
  let id = columnID.toLocaleString();
  id=id.split('-')[0];
  console.log(id);

  //basado en la duracion de las clases reales, necesitamos eliminar clases falsas de cada dia, asi evito que hayan clases extra
  //luego de cada evento de arrastre, hay que verificar si hay menos clases falsas de las que deberia para añadirlas
  // console.log(classes)
  // //bucle for para cada columna, es decir cada dia
  // for (let index = 0; index < columns.length; index++) {

  var realDuration =0;
  
  const classesOfOneDay = classes.filter((c)=>c.day ==Number(id));
  // console.log(classesOfOneDay)

  //calculamos la cantidad de horas reales
  for (let j = 0; j < classesOfOneDay.length; j++) {
    //si la clase actual es real, borramos clases falsas ce la misma duracion-1 desde el final 
    // console.log(classesOfOneDay[j]);
    if(classesOfOneDay[j].isDefault == false){
      //como la clase actual no es default, es una clase real, por lo tanto, obtenemos la duracion
      realDuration+=classesOfOneDay[j].duration-1;
    }
  }
  console.log(classesOfOneDay.length+realDuration,classesOfOneDay)

  if(classesOfOneDay.length+realDuration >19){
    let i=0;
    while(realDuration>0 && i<classesOfOneDay.length){
      if(classesOfOneDay[classesOfOneDay.length-1-i].isDefault){
        classesOfOneDay.splice(classesOfOneDay.length-1-i,1);
        realDuration--;
      }
      i++;
      console.log('bucle while')
      // classesOfOneDay[19-i]
    }
  }
  setClasses((prevClasses) => 
    prevClasses.filter((clase) => clase.day !== Number(id)).concat(classesOfOneDay)
  );
  console.log('borrando')
  // console.log(classesOfOneDay)

}


export function addExtraFalseRows(
  classes: Class[],
  columnID: UniqueIdentifier,
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>
){
   // console.log(columnID);
   let id = columnID.toLocaleString();
   id=id.split('-')[0];
   console.log(id);
 
   //basado en la duracion de las clases reales, necesitamos eliminar clases falsas de cada dia, asi evito que hayan clases extra
   //luego de cada evento de arrastre, hay que verificar si hay menos clases falsas de las que deberia para añadirlas
   // console.log(classes)
   // //bucle for para cada columna, es decir cada dia
   // for (let index = 0; index < columns.length; index++) {
 
   var realDuration =0;
   
   const classesOfOneDay = classes.filter((c)=>c.day ==Number(id));
   // console.log(classesOfOneDay)
 
   //calculamos la cantidad de horas reales
   for (let j = 0; j < classesOfOneDay.length; j++) {
     //si la clase actual es real, borramos clases falsas ce la misma duracion-1 desde el final 
     // console.log(classesOfOneDay[j]);
     if(classesOfOneDay[j].isDefault == false){
       //como la clase actual no es default, es una clase real, por lo tanto, obtenemos la duracion
       realDuration+=classesOfOneDay[j].duration-1;
     }
   }
  //  console.log(classesOfOneDay.length+realDuration,classesOfOneDay)
   let faltantes = 19-realDuration-classesOfOneDay.length;
   if(classesOfOneDay.length+realDuration <19){
     for (let index = 1; index <= faltantes; index++) {
      classesOfOneDay.push({
        id: `${id}-${classesOfOneDay.length}`,
        title: `test${classesOfOneDay.length}-${id}`,
        day: Number(id),
        duration: 1,
        classroom: '3T1',
        isDefault: true
      });
      // classesOfOneDay
      
     }
    }
   setClasses((prevClasses) => 
     prevClasses.filter((clase) => clase.day !== Number(id)).concat(classesOfOneDay)
   );
   console.log('borrando')
   // console.log(classesOfOneDay)
}