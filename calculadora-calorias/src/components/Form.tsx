// importaciones necesarias
import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"

const initialState: Activity = {

  // Genera un ID único para cada nueva actividad
  id: uuidv4(),
  
  // Categoría inicial (por defecto 'Comida')
  category: 1,
  
  // Nombre inicial de la actividad
  name: '',
  
  // Calorías iniciales
  calories: 0 
}

/**
 * Form - Componente de formulario para crear o editar actividades.
 *
 * Permite al usuario introducir y modificar datos de una actividad, como nombre, categoría y calorías.
 * Utiliza el estado global para gestionar las actividades y realizar operaciones de creación y edición.
 *
 * @return Elemento de formulario para la entrada de datos de la actividad.
 */

export default function Form() {
  const { state, dispatch } = useActivity() // Usa el contexto de actividad
  const [activity, setActivity] = useState<Activity>(initialState) // Estado local para gestionar la actividad actual

  // Efecto para cargar datos de una actividad cuando se selecciona para editar
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.find(activity => activity.id === state.activeId)
      if (selectedActivity) {
        setActivity(selectedActivity)
      }
    }
  }, [state.activeId])

  // Maneja cambios en los campos de formulario, actualizando el estado local
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value // Convierte a número si el campo es numérico
    })
  }

  // Valida si los datos de la actividad son válidos para ser guardados
  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  // Maneja el envío del formulario, guardando la actividad y reiniciando el estado
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'save-activity', payload: { newActivity: activity } })
    setActivity({ ...initialState, id: uuidv4() }) // Reinicia el formulario con un nuevo ID
  }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Selector de categoría */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Entrada para el nombre de la actividad */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      {/* Entrada para las calorías */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      {/* Botón de envío del formulario */}
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
