// importaciones necesarias
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useActivity } from "../hooks/useActivity"

/**
 * ActivityList - Componente para listar y manejar actividades.
 *
 * Este componente muestra una lista de actividades relacionadas con comidas y ejercicios.
 * Permite al usuario editar o eliminar actividades mediante íconos interactivos.
 *
 * Utiliza el hook personalizado `useActivity` para acceder y manejar el estado global de las actividades.
 */
export default function ActivityList() {
    // Obtiene el estado y las funciones del contexto de actividades.
    const { state, dispatch, isEmptyActivities, categoryName } = useActivity()
    
    return (
        <>
            {/* Título de la sección */}
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>
        
            {/* Condicional que muestra un mensaje si no hay actividades, o lista las existentes */}
            {isEmptyActivities ? 
                <p className="text-center my-5">No hay actividades aún...</p> : 
                state.activities.map( activity => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                        <div className="space-y-2 relative"> 

                            {/* Etiqueta de categoría de la actividad */}
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                            ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(+activity.category)}
                            </p>

                            {/* Nombre de la actividad */}
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>

                            {/* Calorías asociadas a la actividad */}
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>Calorías</span>
                            </p>
                        </div>

                        {/* Botones para editar y eliminar actividades */}
                        <div className="flex gap-5 items-center">
                            
                            {/* Botón para activar la edición de la actividad */}
                            <button
                                onClick={() => dispatch({type: "set-activeId", payload: {id: activity.id}})}
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>

                            {/* Botón para eliminar la actividad */}
                            <button
                                onClick={() => dispatch({type: "delete-activity", payload: {id: activity.id}})}
                            >
                                <XCircleIcon
                                    className="h-8 w-8 text-red-500"
                                />
                            </button>
                        </div>
                    </div>
                ))}
        </>
    )
}
